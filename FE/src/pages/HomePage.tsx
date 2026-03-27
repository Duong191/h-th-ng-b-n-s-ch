import { useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useBookstore } from '../context/BookstoreContext';
import BookCard from '../components/ui/BookCard';
import { formatPrice, discountedUnitPrice, fixImagePath } from '../utils/format';
import { getBestSellersByCategory } from '../services/booksService';
import { Book } from '../context/BookstoreContext';

const PER = 5;

interface BookWithExtras extends Book {
  featured?: boolean;
  category?: string;
  categoryName?: string;
  tags?: string[];
  salesCount?: number;
  reviews?: number;
  images?: string[];
  originalPrice?: number;
}

function slicePage<T>(items: T[], page: number, per = PER): T[] {
  const start = page * per;
  return items.slice(start, start + per);
}

export default function HomePage() {
  const navigate = useNavigate();
  const { data, loading, addToCart } = useBookstore();
  const books = (data?.books || []) as BookWithExtras[];

  const featured = useMemo(() => books.filter((b) => b.featured), [books]);
  const [featPage, setFeatPage] = useState(0);
  const featPages = Math.max(1, Math.ceil(featured.length / PER));

  const comicsAll = useMemo(
    () =>
      books.filter((b) => {
        const categoryId = String((b as any).category ?? b.categoryId ?? '');
        const categoryName = String((b as any).categoryName ?? '').toLowerCase();
        return (
          categoryId === '5' ||
          categoryId === '9' ||
          categoryName.includes('manga') ||
          categoryName.includes('comic') ||
          categoryName.includes('thiếu nhi') ||
          categoryName.includes('thieu nhi')
        );
      }),
    [books]
  );
  const [comicTab, setComicTab] = useState('manga-comic');
  const [comicPage, setComicPage] = useState(0);
  const comicFiltered = useMemo(() => {
    if (comicTab === 'manga-comic') {
      return comicsAll.filter(
        (b) => {
          const categoryId = String((b as any).category ?? b.categoryId ?? '');
          const categoryName = String((b as any).categoryName ?? '').toLowerCase();
          const hasMangaTag =
            Array.isArray(b.tags) &&
            b.tags.some((t) => String(t).toLowerCase().includes('manga') || String(t).toLowerCase().includes('comic'));
          return categoryId === '9' || categoryName.includes('manga') || categoryName.includes('comic') || hasMangaTag;
        }
      );
    }
    if (comicTab === 'truyen-thieu-nhi') {
      return comicsAll.filter((b) => {
        const categoryId = String((b as any).category ?? b.categoryId ?? '');
        const categoryName = String((b as any).categoryName ?? '').toLowerCase();
        if (categoryId === '5' || categoryName.includes('thiếu nhi') || categoryName.includes('thieu nhi')) {
          return true;
        }
        const hasMangaTag =
          Array.isArray(b.tags) &&
          b.tags.some((t) => String(t).toLowerCase().includes('manga') || String(t).toLowerCase().includes('comic'));
        return !hasMangaTag && categoryId !== '9' && !categoryName.includes('manga') && !categoryName.includes('comic');
      });
    }
    return comicsAll;
  }, [comicsAll, comicTab]);
  const comicPages = Math.max(1, Math.ceil(comicFiltered.length / PER));

  const [rankCat, setRankCat] = useState('1');
  const rankingPreview = useMemo(() => getBestSellersByCategory(books, rankCat).slice(0, 5), [books, rankCat]);

  const foreignAll = useMemo(
    () =>
      books.filter((b) => {
        const categoryId = String((b as any).category ?? b.categoryId ?? '');
        const categoryName = String((b as any).categoryName ?? '').toLowerCase();
        return (
          categoryId === '6' ||
          categoryName.includes('ngoại ngữ') ||
          categoryName.includes('ngoai ngu') ||
          categoryName.includes('foreign')
        );
      }),
    [books]
  );
  const [foreignTab, setForeignTab] = useState('english');
  const [foreignPage, setForeignPage] = useState(0);
  const foreignFiltered = useMemo(() => {
    const kw: Record<string, string[]> = {
      chinese: ['tiếng trung', 'tieng trung', 'chinese', 'hsk', 'trung quốc', 'trung quoc', '中文', '汉语'],
      japanese: ['tiếng nhật', 'tieng nhat', 'japanese', 'jlpt', 'n5', 'n4', 'n3', 'n2', 'n1', '日本語'],
      korean: ['tiếng hàn', 'tieng han', 'korean', 'topik', '한국어'],
      english: ['tiếng anh', 'tieng anh', 'english', 'ielts', 'toeic', 'toefl'],
    };
    const keywords = kw[foreignTab] || [];
    return foreignAll.filter((book) => {
      const lang = String(book.language || '').toLowerCase();
      const tags = Array.isArray(book.tags) ? book.tags.map((t) => String(t).toLowerCase()) : [];
      const title = String(book.title || '').toLowerCase();
      const publisher = String(book.publisher || '').toLowerCase();
      const description = String(book.description || '').toLowerCase();
      const categoryName = String((book as any).categoryName || '').toLowerCase();
      const haystack = `${lang} ${title} ${publisher} ${description} ${categoryName}`;
      return keywords.some((k) => haystack.includes(k) || tags.some((t) => t.includes(k)));
    });
  }, [foreignAll, foreignTab]);
  const foreignPages = Math.max(1, Math.ceil(foreignFiltered.length / PER));

  const recommendations = useMemo(() => {
    const shuffled = [...books].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(35, books.length));
  }, [books]);

  if (loading) {
    return (
      <div className="container" style={{ padding: 60 }}>
        Đang tải…
      </div>
    );
  }

  return (
    <>
      <section className="hero">
        <div className="hero-slider">
          <div className="hero-slide active">
            <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600" alt="Books" />
            <div className="hero-content">
              <div className="container">
                <h1>Khám Phá Thế Giới Sách</h1>
                <p>Hàng ngàn đầu sách hay đang chờ bạn khám phá</p>
                <NavLink to="/shop" className="btn btn-primary">
                  Mua Sắm Ngay
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-books">
        <div className="container">
          <div className="section-header">
            <h2>Sách Nổi Bật</h2>
          </div>
          <div className="featured-books-carousel">
            <button
              type="button"
              className="carousel-nav prev"
              disabled={featPage <= 0}
              onClick={() => setFeatPage((p) => Math.max(0, p - 1))}
            >
              <i className="fas fa-chevron-left" />
            </button>
            <div className="books-container">
              <div className="books-carousel" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {slicePage(featured, featPage).map((book) => (
                  <div key={book.id} style={{ width: 200 }}>
                    <BookCard book={book as any} onAddToCart={addToCart} />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="carousel-nav next"
              disabled={featPage >= featPages - 1}
              onClick={() => setFeatPage((p) => Math.min(featPages - 1, p + 1))}
            >
              <i className="fas fa-chevron-right" />
            </button>
          </div>
          <div className="view-more-container">
            <NavLink to="/shop?filter=featured" className="view-more-btn">
              Xem Thêm
            </NavLink>
          </div>
        </div>
      </section>

      <section className="featured-books">
        <div className="container">
          <div className="section-header comic-section-header">
            <h2>Truyện Tranh</h2>
          </div>
          <div className="comic-tabs-wrapper">
            <div className="swiper-wrapper">
              <button
                type="button"
                className={`comic-tab-btn ${comicTab === 'manga-comic' ? 'active' : ''}`}
                onClick={() => {
                  setComicTab('manga-comic');
                  setComicPage(0);
                }}
              >
                Manga - Comic
              </button>
              <button
                type="button"
                className={`comic-tab-btn ${comicTab === 'truyen-thieu-nhi' ? 'active' : ''}`}
                onClick={() => {
                  setComicTab('truyen-thieu-nhi');
                  setComicPage(0);
                }}
              >
                Truyện Thiếu Nhi
              </button>
            </div>
          </div>
          <div className="featured-books-carousel">
            <button
              type="button"
              className="carousel-nav prev"
              disabled={comicPage <= 0}
              onClick={() => setComicPage((p) => Math.max(0, p - 1))}
            >
              <i className="fas fa-chevron-left" />
            </button>
            <div className="books-container">
              <div className="books-carousel" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {comicFiltered.length === 0 ? (
                  <p style={{ padding: 40, color: '#666' }}>Chưa có sản phẩm nào</p>
                ) : (
                  slicePage(comicFiltered, comicPage).map((book) => (
                    <div key={book.id} style={{ width: 200 }}>
                      <BookCard book={book as any} onAddToCart={addToCart} />
                    </div>
                  ))
                )}
              </div>
            </div>
            <button
              type="button"
              className="carousel-nav next"
              disabled={comicPage >= comicPages - 1}
              onClick={() => setComicPage((p) => Math.min(comicPages - 1, p + 1))}
            >
              <i className="fas fa-chevron-right" />
            </button>
          </div>
          <div className="view-more-container">
            <NavLink to={comicTab === 'manga-comic' ? '/shop?category=9' : '/shop?category=5'} className="view-more-btn">
              Xem Thêm
            </NavLink>
          </div>
        </div>
      </section>

      <section className="bestseller-ranking-preview">
        <div className="container">
          <div className="section-header ranking-preview-header">
            <h2>Bảng xếp hạng bán chạy tuần</h2>
          </div>
          <div className="ranking-preview-tabs-wrapper">
            <div className="ranking-preview-tabs">
              {[
                { id: '1', label: 'Văn học' },
                { id: '2', label: 'Kinh Tế' },
                { id: '7', label: 'Tâm lý - Kỹ năng sống' },
                { id: '5', label: 'Thiếu nhi' },
                { id: '6', label: 'Sách học ngoại ngữ' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`ranking-preview-tab-btn ${rankCat === t.id ? 'active' : ''}`}
                  onClick={() => setRankCat(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="ranking-preview-list">
            {rankingPreview.length === 0 ? (
              <p style={{ textAlign: 'center', padding: 40, color: '#666' }}>Chưa có sách trong danh mục này</p>
            ) : (
              rankingPreview.map((book, index) => {
                const rank = index + 1;
                const score =
                  (book.salesCount || 0) * 10 + (book.rating || 0) * 100 + (book.reviews || 0) * 2;
                const imgRaw = book.images?.[0] || book.image;
                const img = fixImagePath(imgRaw);
                return (
                  <div key={book.id} className="ranking-preview-item">
                    <div className="ranking-preview-rank">
                      <div className="ranking-preview-rank-number">{String(rank).padStart(2, '0')}</div>
                      <div className="ranking-preview-rank-trend">
                        <i className="fas fa-arrow-up" />
                      </div>
                    </div>
                    <div className="ranking-preview-item-content">
                      <NavLink to={`/books/${book.id}`}>
                        <img
                          src={img}
                          alt={book.title}
                          className="ranking-preview-book-image"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            target.src = 'https://placehold.co/240x320?text=No+Image';
                          }}
                        />
                      </NavLink>
                      <div className="ranking-preview-book-info">
                        <h3 className="ranking-preview-book-title">
                          <NavLink to={`/books/${book.id}`}>{book.title}</NavLink>
                        </h3>
                        <p className="ranking-preview-book-author">{book.author}</p>
                        <div className="ranking-preview-book-score">
                          <span className="score-value">{score.toLocaleString('vi-VN')}</span> điểm
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="view-more-container">
            <NavLink to="/bestseller-ranking" className="view-more-btn">
              Xem thêm
            </NavLink>
          </div>
        </div>
      </section>

      <section className="featured-books">
        <div className="container">
          <div className="section-header">
            <h2>Sách Ngoại Ngữ</h2>
          </div>
          <div className="comic-tabs-wrapper">
            <div className="swiper-wrapper">
              {[
                { id: 'english', label: 'Sách tiếng Anh' },
                { id: 'chinese', label: 'Sách tiếng Trung' },
                { id: 'japanese', label: 'Sách tiếng Nhật' },
                { id: 'korean', label: 'Sách tiếng Hàn' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`comic-tab-btn ${foreignTab === t.id ? 'active' : ''}`}
                  onClick={() => {
                    setForeignTab(t.id);
                    setForeignPage(0);
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="featured-books-carousel">
            <button
              type="button"
              className="carousel-nav prev"
              disabled={foreignPage <= 0}
              onClick={() => setForeignPage((p) => Math.max(0, p - 1))}
            >
              <i className="fas fa-chevron-left" />
            </button>
            <div className="books-container">
              <div className="books-carousel" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {foreignFiltered.length === 0 ? (
                  <p style={{ padding: 40, color: '#666' }}>Chưa có sản phẩm nào</p>
                ) : (
                  slicePage(foreignFiltered, foreignPage).map((book) => (
                    <div key={book.id} style={{ width: 200 }}>
                      <BookCard book={book as any} onAddToCart={addToCart} />
                    </div>
                  ))
                )}
              </div>
            </div>
            <button
              type="button"
              className="carousel-nav next"
              disabled={foreignPage >= foreignPages - 1}
              onClick={() => setForeignPage((p) => Math.min(foreignPages - 1, p + 1))}
            >
              <i className="fas fa-chevron-right" />
            </button>
          </div>
          <div className="view-more-container">
            <NavLink to="/shop?category=6" className="view-more-btn">
              Xem Thêm
            </NavLink>
          </div>
        </div>
      </section>

      <section className="recommendations-section">
        <div className="container">
          <div className="recommendations-banner">
            <i className="fas fa-sparkles" />
            <h2>Gợi ý cho bạn</h2>
            <i className="fas fa-sparkles" />
          </div>
          <div className="recommendations-container">
            <div className="recommendations-grid books-grid">
              {recommendations.map((book) => {
                const price = discountedUnitPrice(book);
                const imgRaw = book.images?.[0] || book.image;
                const img = fixImagePath(imgRaw);
                return (
                  <div
                    key={book.id}
                    className="box-content"
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/books/${book.id}`)}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/books/${book.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="content-image">
                      <div className="book-image-container">
                        <img
                          src={img}
                          alt={book.title}
                          className="book-image"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            target.src = 'https://placehold.co/400x560?text=No+Image';
                          }}
                        />
                      </div>
                    </div>
                    <div className="content-info">
                      <div className="book-info">
                        <h3 className="book-title">{book.title}</h3>
                        <div className="book-price-section">
                          <div className="book-price">
                            <span className="current-price">{formatPrice(price)}</span>
                            {book.discount > 0 && <span className="discount-badge">-{book.discount}%</span>}
                          </div>
                          {book.originalPrice && book.originalPrice > price && (
                            <span className="original-price">{formatPrice(book.originalPrice)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="view-more-container">
              <NavLink to="/shop" className="view-more-btn">
                <span>Xem thêm</span>
                <i className="fas fa-arrow-right" />
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Đăng Ký Nhận Tin</h2>
            <p>Nhận thông tin về sách mới và khuyến mãi đặc biệt</p>
            <form
              className="newsletter-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Cảm ơn bạn đã đăng ký nhận tin!');
                (e.target as HTMLFormElement).reset();
              }}
            >
              <input type="email" placeholder="Nhập email của bạn" required />
              <button type="submit" className="btn btn-primary">
                Đăng Ký
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
