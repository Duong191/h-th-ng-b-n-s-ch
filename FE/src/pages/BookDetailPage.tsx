import { FormEvent, useEffect, useMemo, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { useBookstore } from '../context/BookstoreContext';
import { formatPrice, discountedUnitPrice, fixImagePath } from '../utils/format';
import BookCard from '../components/ui/BookCard';
import { getRelatedBooks } from '../services/booksService';

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, getBookById, addToCart, loading, currentUser, showToast } = useBookstore();
  const book = id ? getBookById(id) : null;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState<{ id: string; userId: string; rating: number; comment: string; createdAt: string }[]>([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const bookWithExtras = book ? (book as any) : null;
  const imagesRaw = bookWithExtras?.images || (book?.image ? [book.image] : []);
  const images = imagesRaw.map((img: string) => fixImagePath(img));
  const relatedBooks = useMemo(() => {
    if (!book || !data?.books) return [];
    return getRelatedBooks(data.books, book.id, 4);
  }, [book, data]);

  useEffect(() => {
    setReviews([]);
    setReviewLoading(false);
    return () => {};
  }, [id]);

  if (loading) return <div className="container" style={{ padding: 60 }}>Đang tải…</div>;
  if (!book) return <div className="container" style={{ padding: 60 }}>Không tìm thấy sách</div>;

  const price = discountedUnitPrice(book);
  const category = data?.categories?.find((c) => c.id === book.categoryId || c.id === (book as any).category);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(book.id);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleSubmitReview = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast('Tạm thời tắt tính năng đánh giá qua API để làm lại BE', 'info');
  };

  const handleDeleteReview = async (_reviewId: string) => {
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
                <img src={images[selectedImage] || book.image} alt={book.title} />
              </div>
              {images.length > 1 && (
                <div className="thumbnail-gallery">
                  {images.slice(0, 5).map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className={`thumbnail-item ${selectedImage === idx ? 'active' : ''}`}
                      onClick={() => setSelectedImage(idx)}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="book-actions">
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  <img src="/icon/book_details/add-to-cart.svg" alt="Cart" className="btn-icon" />
                  Thêm vào giỏ hàng
                </button>
                <button className="buy-now-btn" onClick={handleBuyNow}>
                  <img src="/icon/book_details/thunder.svg" alt="Buy" className="btn-icon" />
                  Mua ngay
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

            {/* Right Column: Book Info */}
            <div className="book-info-section">
              <div className="book-header">
                {bookWithExtras?.trending && <div className="book-badge">Xu hướng</div>}
                {bookWithExtras?.bestSeller && <div className="book-badge">Bán chạy</div>}
                {bookWithExtras?.isNew && <div className="book-badge">Mới</div>}
                <h1 className="book-title">{book.title}</h1>
                <div className="book-supplier">
                  <span>Nhà cung cấp: <span>{bookWithExtras?.brand || 'N/A'}</span></span>
                </div>
                <div className="book-publisher">
                  <span>Nhà xuất bản: <span>{book.publisher || 'N/A'}</span></span>
                </div>
              </div>

              <div className="book-rating">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <img
                      key={star}
                      src="/icon/book_details/star.svg"
                      alt="Star"
                      className="star-icon"
                      style={{ opacity: star <= (book.rating || 0) ? 1 : 0.3 }}
                    />
                  ))}
                </div>
                <span className="rating-text">({book.reviewCount || bookWithExtras?.reviews || 0} đánh giá)</span>
                <span className="sales-count">| Đã bán {book.soldCount || bookWithExtras?.salesCount || 0}+</span>
              </div>

              <div className="price-section">
                <div className="current-price">{formatPrice(price)}</div>
                {book.discount > 0 && (
                  <>
                    <div className="original-price">{formatPrice(book.price)}</div>
                    <div className="discount-badge">-{book.discount}%</div>
                  </>
                )}
              </div>

              <div className="book-meta">
                <div className="meta-item">
                  <span className="meta-label">Tác giả:</span>
                  <span className="meta-value">{book.author}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Hình thức bìa:</span>
                  <span className="meta-value">{bookWithExtras?.format || 'Bìa Mềm'}</span>
                </div>
              </div>

              <div className="promo-link">
                <a href="#">Chính sách khuyến mãi trên chỉ áp dụng tại Bookarazi.com &gt;</a>
              </div>

              {/* Shipping Info */}
              <div className="shipping-info">
                <h4>Thông tin vận chuyển</h4>
                <div className="shipping-location">
                  <span>Giao hàng đến Phường Bến Nghé, Quận 1, Hồ Chí Minh</span>
                  <a href="#" className="change-location">Thay đổi</a>
                </div>
                <div className="shipping-method">
                  <img src="/icon/book_details/delivery-truck.svg" alt="Delivery" className="shipping-icon" />
                  <span>Giao hàng tiêu chuẩn</span>
                </div>
                <div className="shipping-time">
                  <span>Dự kiến giao trong 2-3 ngày</span>
                </div>
              </div>

              {/* Related Offers */}
              <div className="related-offers">
                <h4>Ưu đãi liên quan</h4>
                <div className="offers-list">
                  <div className="offer-item">Mã giảm 10k - toàn bộ đơn hàng</div>
                  <div className="offer-item">Zalopay: giảm 15k cho đơn từ 99k</div>
                  <div className="offer-item">Momo: giảm 20k cho đơn từ 150k</div>
                  <div className="offer-item">Vietcombank: giảm 5% tối đa 50k</div>
                </div>
                <a href="#" className="view-more-offers">Xem thêm &gt;</a>
              </div>

              {/* Quantity Selector */}
              <div className="quantity-selector">
                <h4>Số lượng</h4>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn minus" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(book.stock, parseInt(e.target.value) || 1)))}
                    min="1"
                    max={book.stock}
                  />
                  <button 
                    className="quantity-btn plus" 
                    onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="book-details-section">
            <div className="details-tabs">
              <button
                className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Thông tin chi tiết
              </button>
              <button
                className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Mô tả sản phẩm
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'details' ? (
                <div className="tab-panel active">
                  <div className="details-table">
                    <div className="detail-row">
                      <span className="detail-label">Mã hàng</span>
                      <span className="detail-value">{book.isbn || 'N/A'}</span>
                      <span className="detail-label">Tên Nhà Cung Cấp</span>
                      <span className="detail-value">{bookWithExtras?.brand || 'N/A'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Tác giả</span>
                      <span className="detail-value">{book.author}</span>
                      <span className="detail-label">NXB</span>
                      <span className="detail-value">{book.publisher || 'N/A'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Năm XB</span>
                      <span className="detail-value">{bookWithExtras?.publishYear || book.publishDate || 'N/A'}</span>
                      <span className="detail-label">Trọng lượng (gr)</span>
                      <span className="detail-value">{bookWithExtras?.weight || 400}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Kích Thước Bao Bì</span>
                      <span className="detail-value">{bookWithExtras?.dimensions || '20.5 x 14.5 x 2.5 cm'}</span>
                      <span className="detail-label">Số trang</span>
                      <span className="detail-value">{book.pages || 'N/A'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Hình thức</span>
                      <span className="detail-value">{bookWithExtras?.format || 'Bìa Mềm'}</span>
                      <span className="detail-label"></span>
                      <span className="detail-value"></span>
                    </div>
                  </div>

                  {category && (
                    <div className="best-seller-link">
                      <NavLink to={`/shop?category=${category.id}`}>
                        Top 100 sản phẩm {category.name} bán chạy của tháng
                      </NavLink>
                    </div>
                  )}
                </div>
              ) : (
                <div className="tab-panel active">
                  <div className="product-description">
                    <h3>{book.title}</h3>
                    <div className="description-content">
                      {book.description || 'Chưa có mô tả'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Books */}
          <div className="book-details-section" style={{ marginTop: 24 }}>
            <h2 className="section-title">Đánh giá sản phẩm</h2>
            {reviewLoading ? (
              <p>Đang tải đánh giá...</p>
            ) : reviews.length === 0 ? (
              <p>Chưa có đánh giá nào.</p>
            ) : (
              <div style={{ display: 'grid', gap: 12 }}>
                {reviews.map((review) => (
                  <div key={review.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong>{review.rating}/5 sao</strong>
                      {currentUser && currentUser.id === review.userId && (
                        <button className="btn btn-secondary" onClick={() => handleDeleteReview(review.id)}>
                          Xóa
                        </button>
                      )}
                    </div>
                    <div style={{ marginTop: 8 }}>{review.comment || 'Không có bình luận'}</div>
                  </div>
                ))}
              </div>
            )}
            {currentUser && (
              <form onSubmit={handleSubmitReview} style={{ marginTop: 16, display: 'grid', gap: 10 }}>
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
                  rows={4}
                  placeholder="Chia sẻ cảm nhận của bạn..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                  Gửi đánh giá
                </button>
              </form>
            )}
          </div>

          {relatedBooks.length > 0 && (
            <div className="related-books-section">
              <h2 className="section-title">Sản phẩm liên quan</h2>
              <div className="books-grid">
                {relatedBooks.map((relBook) => (
                  <BookCard key={relBook.id} book={relBook as any} onAddToCart={addToCart} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
