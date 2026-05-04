import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { useBookstore } from '../context/BookstoreContext';
import type { Book } from '../context/BookstoreContext';
import { formatPrice, discountedUnitPrice, fixImagePath } from '../utils/format';
import { getRelatedBooks } from '../services/booksService';
import RecommendationSection from '../components/recommendation/RecommendationSection';
import { fetchBookById } from '../api/publicApi';
import { bookDescriptionToElements } from '../utils/bookDescription';

/** Chiều cao tối đa khi thu gọn mô tả (px) — vượt quá thì hiện "Xem thêm". */
const COLLAPSED_DESC_MAX_PX = 280;
/** Nếu đo chiều cao lệch (font/CSS), xem văn dài cỡ này thì vẫn hiện nút. */
const LONG_DESCRIPTION_CHARS = 520;

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, getBookById, addToCart, loading, currentUser, showToast, persist } = useBookstore();
  const book = id ? getBookById(id) : null;
  /** Tồn kho mới nhất từ API (tránh cache cũ trên trang chi tiết). */
  const [stockBook, setStockBook] = useState<Book | null>(null);
  const displayBook = stockBook ?? book;
  const stock = displayBook ? Number(displayBook.stock) : 0;
  const outOfStock = stock <= 0;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState<{ id: string; userId: string; rating: number; comment: string; createdAt: string }[]>([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  /** Mô tả dài: thu gọn / mở rộng (giống mẫu Fahasa). */
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [descriptionNeedsToggle, setDescriptionNeedsToggle] = useState(false);
  const descriptionMeasureRef = useRef<HTMLDivElement>(null);


  const bookWithExtras = displayBook ? (displayBook as any) : null;
  const imagesRaw = bookWithExtras?.images || (displayBook?.image ? [displayBook.image] : []);
  const images = imagesRaw.map((img: string) => fixImagePath(img));
  const tags = Array.isArray(bookWithExtras?.tags) ? (bookWithExtras.tags as unknown[]).map((t) => String(t)) : [];
  const variants = useMemo(() => {
    const fromTags = tags
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 6);
    if (fromTags.length) return fromTags;
    return ['Bìa mềm', 'Bìa cứng'];
  }, [tags]);
  const [selectedVariant, setSelectedVariant] = useState<string>(() => variants[0] || 'Bìa mềm');
  const relatedBooks = useMemo(() => {
    if (!book || !data?.books) return [];
    return getRelatedBooks(data.books, book.id, 80);
  }, [book, data]);

  useEffect(() => {
    setReviews([]);
    setReviewLoading(false);
    setDescriptionExpanded(false);
    setDescriptionNeedsToggle(false);
    return () => {};
  }, [id]);

  const descriptionText = (displayBook?.description ?? book?.description ?? '').trim();

  useEffect(() => {
    let rafId = 0;
    let resizeObserver: ResizeObserver | null = null;

    const measure = (): void => {
      const el = descriptionMeasureRef.current;
      if (!el) {
        setDescriptionNeedsToggle(descriptionText.length >= LONG_DESCRIPTION_CHARS);
        return;
      }
      const tallEnough = el.scrollHeight > COLLAPSED_DESC_MAX_PX + 8;
      const longEnough = descriptionText.length >= LONG_DESCRIPTION_CHARS;
      setDescriptionNeedsToggle(tallEnough || longEnough);
    };

    /** Đo sau layout (double rAF tránh scrollHeight = 0 lúc mới paint / font loading). */
    const scheduleMeasure = (): void => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        requestAnimationFrame(measure);
      });
    };

    const attachResizeObserver = (): void => {
      resizeObserver?.disconnect();
      const el = descriptionMeasureRef.current;
      if (typeof ResizeObserver === 'undefined' || !el) return;
      resizeObserver = new ResizeObserver(() => scheduleMeasure());
      resizeObserver.observe(el);
    };

    scheduleMeasure();
    attachResizeObserver();
    window.addEventListener('resize', scheduleMeasure);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', scheduleMeasure);
    };
  }, [descriptionText, displayBook?.id]);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setStockBook(null);
    (async () => {
      try {
        const b = await fetchBookById(id);
        if (cancelled) return;
        const prevSnap = book;
        const imageOk = Boolean(b.image && String(b.image).trim() !== '');
        const merged: Book =
          !imageOk && prevSnap?.image
            ? ({ ...b, image: prevSnap.image, images: [prevSnap.image] } as Book)
            : b;
        setStockBook(merged);
        persist((prev) => {
          if (!prev) return prev;
          const books = [...(prev.books || [])];
          const idx = books.findIndex((x) => x && String(x.id) === String(merged.id));
          if (idx >= 0) books[idx] = merged;
          else books.push(merged);
          return { ...prev, books };
        });
      } catch {
        if (!cancelled) setStockBook(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, persist]);

  useEffect(() => {
    // Keep selectedVariant in sync when book changes
    setSelectedVariant((prev) => (variants.includes(prev) ? prev : variants[0] || 'Bìa mềm'));
  }, [variants]);

  useEffect(() => {
    setQuantity((q) => {
      if (outOfStock) return 1;
      return Math.min(Math.max(1, q), Math.max(1, stock));
    });
  }, [stock, outOfStock]);

  const totalReviews = Number(book?.reviewCount || bookWithExtras?.reviews || reviews.length || 0);
  const avgRating = Number(book?.rating || 0);
  const reviewBreakdown = useMemo(() => {
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    for (const r of reviews) {
      const key = Math.max(1, Math.min(5, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
      counts[key] += 1;
    }
    return [5, 4, 3, 2, 1].map((star) => {
      const count = counts[star as 1 | 2 | 3 | 4 | 5];
      const percent = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
      return { star, percent };
    });
  }, [reviews, totalReviews]);

  if (loading) return <div className="container" style={{ padding: 60 }}>Đang tải…</div>;
  if (!book) return <div className="container" style={{ padding: 60 }}>Không tìm thấy sách</div>;

  const price = discountedUnitPrice(displayBook!);
  const category = data?.categories?.find((c) => c.id === book.categoryId || c.id === (book as any).category);
  const sold = Number(book.soldCount || bookWithExtras?.salesCount || 0);
  const detailRows = [
    { label: 'Mã hàng', value: book.isbn || 'N/A' },
    { label: 'Tên Nhà Cung Cấp', value: bookWithExtras?.brand || 'N/A' },
    { label: 'Tác giả', value: book.author },
    { label: 'NXB', value: book.publisher || 'N/A' },
    { label: 'Năm XB', value: bookWithExtras?.publishYear || book.publishDate || 'N/A' },
    { label: 'Trọng lượng (gr)', value: String(bookWithExtras?.weight || 400) },
    { label: 'Kích Thước Bao Bì', value: bookWithExtras?.dimensions || '20.5 x 14.5 x 2.5 cm' },
    { label: 'Số trang', value: String(book.pages || 'N/A') },
    { label: 'Hình thức', value: bookWithExtras?.format || 'Bìa Mềm' },
    { label: 'Ngôn ngữ', value: book.language || 'Tiếng Việt' },
  ];

  const handleAddToCart = () => {
    if (!displayBook || outOfStock) {
      showToast('Sách đang hết hàng', 'error');
      return;
    }
    addToCart(displayBook.id, quantity);
  };

  const handleBuyNow = () => {
    if (!displayBook || outOfStock) {
      showToast('Sách đang hết hàng', 'error');
      return;
    }
    addToCart(displayBook.id, quantity);
    navigate('/cart');
  };

  const handleSubmitReview = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast('Tạm thời tắt tính năng đánh giá qua API để làm lại BE', 'info');
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <nav className="breadcrumb-nav">
            <NavLink to="/">Trang chủ</NavLink>
            <span className="separator">/</span>
            <NavLink to="/shop">Cửa hàng</NavLink>
            <span className="separator">/</span>
            <span>{book.title}</span>
          </nav>
        </div>
      </div>

      {/* Book Detail Section */}
      <section className="book-detail-section">
        <div className="container">
          <div className="book-detail-container">
            {/* Left Column: Image Gallery */}
            <div className="book-gallery">
              <div className="main-image">
                <img
                  src={images[selectedImage] || fixImagePath(String(displayBook?.image || book.image || ''))}
                  alt={book.title}
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.onerror = null;
                    el.src = 'https://placehold.co/400x560?text=No+Image';
                  }}
                />
              </div>
              <div className="thumbnail-gallery">
                {images.slice(0, 4).map((img: string, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    className={`thumbnail-item ${selectedImage === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
                {images.length > 4 && (
                  <button type="button" className="thumbnail-item thumbnail-more" onClick={() => setSelectedImage(4)}>
                    <span className="thumbnail-more-count">+{images.length - 4}</span>
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="book-actions">
                <button
                  type="button"
                  className="add-to-cart-btn"
                  disabled={outOfStock}
                  onClick={handleAddToCart}
                  style={outOfStock ? { opacity: 0.6, cursor: 'not-allowed' } : undefined}
                >
                  <img src="/icon/book_details/add-to-cart.svg" alt="Cart" className="btn-icon" />
                  {outOfStock ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
                </button>
                <button
                  type="button"
                  className="buy-now-btn"
                  disabled={outOfStock}
                  onClick={handleBuyNow}
                  style={outOfStock ? { opacity: 0.6, cursor: 'not-allowed' } : undefined}
                >
                  <img src="/icon/book_details/thunder.svg" alt="Buy" className="btn-icon" />
                  {outOfStock ? 'Không thể mua' : 'Mua ngay'}
                </button>
              </div>

              {/* Policies */}
              <div className="book-policies">
                <h4>Chính sách ưu đãi của Bookarazi</h4>
                <div className="policy-item">
                  <i className="fas fa-clock"></i>
                  <span>Thời gian giao hàng: Giao nhanh và uy tín</span>
                  <i className="fas fa-chevron-right"></i>
                </div>
                <div className="policy-item">
                  <img src="/icon/book_details/sync.svg" alt="Sync" className="policy-icon" />
                  <span>Chính sách đổi trả: Đổi trả miễn phí toàn quốc</span>
                  <i className="fas fa-chevron-right"></i>
                </div>
                <div className="policy-item">
                  <i className="fas fa-users"></i>
                  <span>Chính sách khách sỉ: Ưu đãi khi mua số lượng lớn</span>
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
            </div>

            {/* Right column: product summary + shipping (Fahasa-like stacked cards) */}
            <div className="book-right-column block-content-product-detail">
              <div className="product-summary-card block-product-view-mobile">
                <div className="product-summary-card__badges">
                  {bookWithExtras?.trending && <span className="book-badge">Xu hướng</span>}
                  {bookWithExtras?.bestSeller && <span className="book-badge">Bán chạy</span>}
                  {bookWithExtras?.isNew && <span className="book-badge">Mới</span>}
                </div>
                <h1 className="product-summary-card__title">{book.title}</h1>

                <div className="product-summary-card__meta">
                  <div className="product-summary-card__meta-col">
                    <div className="pds-meta-row">
                      <span className="pds-meta-label">Nhà cung cấp</span>
                      <span className="pds-meta-value pds-meta-value--link">{String(bookWithExtras?.brand || 'N/A')}</span>
                    </div>
                    <div className="pds-meta-row">
                      <span className="pds-meta-label">Nhà xuất bản</span>
                      <span className="pds-meta-value">{book.publisher || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="product-summary-card__meta-col">
                    <div className="pds-meta-row">
                      <span className="pds-meta-label">Tác giả</span>
                      <span className="pds-meta-value">{book.author}</span>
                    </div>
                    <div className="pds-meta-row">
                      <span className="pds-meta-label">Hình thức bìa</span>
                      <span className="pds-meta-value">{bookWithExtras?.format || 'Bìa Mềm'}</span>
                    </div>
                  </div>
                </div>

                <div className="product-summary-card__rating-sold">
                  <div className="pds-stars" aria-hidden>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <img
                        key={star}
                        src="/icon/book_details/star.svg"
                        alt=""
                        className="star-icon"
                        style={{ opacity: star <= (book.rating || 0) ? 1 : 0.3 }}
                      />
                    ))}
                  </div>
                  <span className="pds-rating-text">({book.reviewCount || bookWithExtras?.reviews || 0} đánh giá)</span>
                  <span className="pds-rating-sep" aria-hidden>
                    |
                  </span>
                  <span className="pds-sold-text">Đã bán {sold}+</span>
                </div>

                <div className="product-summary-card__price">
                  <span className="pds-current-price">{formatPrice(price)}</span>
                  {book.discount > 0 && (
                    <>
                      <span className="pds-original-price">{formatPrice(book.price)}</span>
                      <span className="pds-discount-pill">-{book.discount}%</span>
                    </>
                  )}
                </div>

                <div className="product-summary-card__promo">
                  <a
                    href="#"
                    className="pds-promo-link"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Chính sách khuyến mãi trên chỉ áp dụng tại Bookarazi.com &gt;
                  </a>
                </div>

                <div className="product-summary-card__stock">
                  {outOfStock ? (
                    <span className="pds-stock-badge pds-stock-badge--out">Sách đang hết hàng</span>
                  ) : (
                    <span className="pds-stock-badge">Còn {stock} cuốn trong kho Bookarazi</span>
                  )}
                </div>
              </div>

              <div className="shipping-card block-info-delivery-mobile">
                <h2 className="shipping-card__heading">Thông tin vận chuyển</h2>
                <div className="shipping-card__address-row">
                  <p className="shipping-card__address-text">
                    Giao hàng đến <strong>Phường Bến Nghé, Quận 1, Hồ Chí Minh</strong>
                  </p>
                  <button type="button" className="shipping-card__change-btn">
                    Thay đổi
                  </button>
                </div>

                <div className="shipping-card__method-box">
                  <img src="/icon/book_details/delivery-truck.svg" alt="" className="shipping-card__method-icon" />
                  <div className="shipping-card__method-text">
                    <span className="shipping-card__method-title">Giao hàng tiêu chuẩn</span>
                  </div>
                </div>
                <p className="shipping-card__eta">Dự kiến giao trong 2-3 ngày</p>

                <div className="shipping-card__vouchers">
                  <div className="shipping-card__vouchers-head">
                    <h3 className="shipping-card__vouchers-title">Ưu đãi liên quan</h3>
                    <a
                      href="#"
                      className="shipping-card__vouchers-more"
                      onClick={(e) => e.preventDefault()}
                    >
                      Xem thêm &gt;
                    </a>
                  </div>
                  <div className="shipping-card__voucher-grid">
                    {[
                      { icon: '🏷️', text: 'Mã giảm 10k - toàn bộ đơn hàng' },
                      { icon: '💳', text: 'Mã giảm 20k - cho đơn từ 150k' },
                      { icon: '🎁', text: 'Mã giảm 25k - sàn TMĐT' },
                      { icon: '🅿️', text: 'Zalopay: giảm 15k cho đơn từ 99k' },
                    ].map((o) => (
                      <div key={o.text} className="shipping-card__voucher">
                        <span className="shipping-card__voucher-icon" aria-hidden>
                          {o.icon}
                        </span>
                        <span className="shipping-card__voucher-text">{o.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="shipping-card__variants">
                  <h3 className="shipping-card__subsection-title">Phân loại</h3>
                  <div className="option-chips">
                    {variants.slice(0, 6).map((v) => (
                      <button
                        key={v}
                        type="button"
                        className={`chip ${selectedVariant === v ? 'active' : ''}`}
                        onClick={() => setSelectedVariant(v)}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="shipping-card__quantity">
                  <h3 className="shipping-card__subsection-title">Số lượng</h3>
                  <div className="quantity-controls">
                    <button
                      type="button"
                      className="quantity-btn minus"
                      disabled={outOfStock}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={outOfStock ? 0 : quantity}
                      disabled={outOfStock}
                      onChange={(e) =>
                        setQuantity(Math.max(1, Math.min(stock, parseInt(e.target.value, 10) || 1)))
                      }
                      min={1}
                      max={stock}
                    />
                    <button
                      type="button"
                      className="quantity-btn plus"
                      disabled={outOfStock}
                      onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="book-details-section block-content-product-detail block-info-detail-mobile">
                <div className="details-block-header">Thông tin chi tiết</div>
                <div className="book-detail-specs" role="list">
                  {detailRows.map((row) => (
                    <div key={row.label} className="book-detail-specs__row" role="listitem">
                      <div className="book-detail-specs__label">{row.label}</div>
                      <div className="book-detail-specs__value">{row.value}</div>
                    </div>
                  ))}
                </div>

                {category && (
                  <div className="best-seller-link">
                    <NavLink to={`/shop?category=${category.id}`}>
                      Top 100 sản phẩm {category.name} bán chạy của tháng
                    </NavLink>
                  </div>
                )}

                <div className="details-block-header" style={{ marginTop: 20 }}>Mô tả sản phẩm</div>
                <div className="product-description">
                  <h3>{book.title}</h3>
                  <div
                    className={
                      descriptionNeedsToggle && !descriptionExpanded
                        ? 'description-content-shell description-content-shell--collapsed'
                        : 'description-content-shell'
                    }
                  >
                    <div ref={descriptionMeasureRef} className="description-content">
                      {descriptionText ? bookDescriptionToElements(descriptionText) : 'Chưa có mô tả'}
                    </div>
                  </div>
                  {descriptionNeedsToggle && (
                    <button
                      type="button"
                      className="product-description-toggle"
                      onClick={() => setDescriptionExpanded((v) => !v)}
                    >
                      {descriptionExpanded ? 'Rút gọn' : 'Xem thêm'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Books */}
          <div className="book-details-section review-summary-card" style={{ marginTop: 24 }}>
            <h2 className="section-title">Đánh giá sản phẩm</h2>
            {reviewLoading ? (
              <p>Đang tải đánh giá...</p>
            ) : (
              <div className="review-summary-layout">
                <div className="review-score-col">
                  <div className="review-score-value">
                    {Number.isFinite(avgRating) ? avgRating.toFixed(1).replace('.0', '') : '0'}
                    <span>/5</span>
                  </div>
                  <div className="review-score-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <img
                        key={star}
                        src="/icon/book_details/star.svg"
                        alt="star"
                        className="star-icon"
                        style={{ opacity: star <= Math.round(avgRating) ? 1 : 0.25 }}
                      />
                    ))}
                  </div>
                  <div className="review-count-text">({totalReviews} đánh giá)</div>
                </div>

                <div className="review-bars-col">
                  {reviewBreakdown.map((row) => (
                    <div key={row.star} className="review-bar-row">
                      <span className="review-bar-label">{row.star} sao</span>
                      <div className="review-bar-track">
                        <div className="review-bar-fill" style={{ width: `${row.percent}%` }} />
                      </div>
                      <span className="review-bar-percent">{row.percent}%</span>
                    </div>
                  ))}
                </div>

                <div className="review-login-col">
                  {currentUser ? (
                    <form onSubmit={handleSubmitReview} className="inline-review-form">
                      <div>
                        <label>Chấm sao: </label>
                        <select value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))}>
                          <option value={5}>5</option>
                          <option value={4}>4</option>
                          <option value={3}>3</option>
                          <option value={2}>2</option>
                          <option value={1}>1</option>
                        </select>
                      </div>
                      <textarea
                        className="form-input"
                        rows={3}
                        placeholder="Chia sẻ cảm nhận của bạn..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                      />
                      <button type="submit" className="btn btn-primary">
                        Gửi đánh giá
                      </button>
                    </form>
                  ) : (
                    <p>
                      Chỉ có thành viên mới có thể viết nhận xét. Vui lòng{' '}
                      <NavLink to="/login">đăng nhập</NavLink> hoặc <NavLink to="/login?tab=register">đăng ký</NavLink>.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {relatedBooks.length > 0 && (
            <RecommendationSection title="Gợi ý cho bạn" books={relatedBooks} moreHref="/shop" moreLabel="Xem thêm" />
          )}
        </div>
      </section>
    </>
  );
}
