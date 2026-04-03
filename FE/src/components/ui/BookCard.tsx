import { useNavigate } from 'react-router-dom';
import { formatPrice, discountedUnitPrice, fixImagePath } from '../../utils/format';
import { Book } from '../../context/BookstoreContext';

interface StarsProps {
  rating?: number;
}

function Stars({ rating = 0 }: StarsProps) {
  const r = Number(rating) || 0;
  const nodes = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(r)) nodes.push(<i key={i} className="fas fa-star" />);
    else if (i - 0.5 <= r) nodes.push(<i key={i} className="fas fa-star-half-alt" />);
    else nodes.push(<i key={i} className="far fa-star" />);
  }
  return <div className="stars">{nodes}</div>;
}

interface BookCardProps {
  book: Book & {
    images?: string[];
    trending?: boolean;
    bestSeller?: boolean;
    bestseller?: boolean;
    isNew?: boolean;
    reviews?: number;
    originalPrice?: number;
    salesCount?: number;
  };
  onAddToCart?: (bookId: string) => void;
}

export default function BookCard({ book, onAddToCart }: BookCardProps) {
  const navigate = useNavigate();
  if (!book) return null;
  const imgRaw = Array.isArray(book.images) ? book.images[0] : book.image;
  const img = fixImagePath(imgRaw);
  const price = discountedUnitPrice(book);
  const outOfStock = !book.stock || Number(book.stock) <= 0;

  const badges = [];
  if (book.trending) badges.push(<span key="t" className="book-badge trending">Xu hướng</span>);
  if (book.bestSeller || book.bestseller)
    badges.push(<span key="b" className="book-badge bestseller">Bán chạy</span>);
  if (book.isNew) badges.push(<span key="n" className="book-badge new">Mới</span>);

  return (
    <div
      className="book-card"
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/books/${book.id}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/books/${book.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="book-image-container" style={{ position: 'relative' }}>
        {outOfStock && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.45)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.95rem',
              zIndex: 2,
            }}
          >
            Hết hàng
          </div>
        )}
        {badges.length > 0 && <div className="book-badges">{badges}</div>}
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
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <div className="book-rating">
          <Stars rating={book.rating} />
          {book.reviews != null && <span className="rating-text">({book.reviews})</span>}
        </div>
        <div className="book-price">
          <span className="current-price">{formatPrice(price)}</span>
          {book.discount > 0 && <span className="discount-badge">-{book.discount}%</span>}
        </div>
        {book.originalPrice && book.originalPrice > price && <span className="original-price">{formatPrice(book.originalPrice)}</span>}
        {onAddToCart && (
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: 8, opacity: outOfStock ? 0.55 : 1 }}
            disabled={outOfStock}
            onClick={(e) => {
              e.stopPropagation();
              if (!outOfStock) onAddToCart(book.id);
            }}
          >
            <i className="fas fa-shopping-cart" /> {outOfStock ? 'Hết hàng' : 'Thêm vào giỏ'}
          </button>
        )}
      </div>
    </div>
  );
}
