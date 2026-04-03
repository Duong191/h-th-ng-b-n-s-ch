import { NavLink } from 'react-router-dom';
import type { Book } from '../../context/BookstoreContext';
import { formatPrice, discountedUnitPrice, fixImagePath } from '../../utils/format';

export type RecommendationBook = Book & {
  images?: string[];
  salesCount?: number;
};

type Props = { book: RecommendationBook };

export default function RecommendationCard({ book: rb }: Props) {
  const imgRaw = Array.isArray(rb.images) ? rb.images[0] : rb.image;
  const img = fixImagePath(imgRaw || '');
  const salePrice = discountedUnitPrice(rb);
  const listPrice = Number(rb.price) || 0;
  const disc = Number(rb.discount) || 0;
  const sold = Number(rb.soldCount ?? rb.salesCount ?? 0);
  const rating = Number(rb.rating) || 0;
  const oos = !rb.stock || Number(rb.stock) <= 0;

  return (
    <NavLink to={`/books/${rb.id}`} className="recommend-card">
      <div className="recommend-image-wrap">
        {oos && <span className="recommend-oos">Hết hàng</span>}
        <img
          src={img}
          alt={rb.title}
          className="recommend-image"
          loading="lazy"
          onError={(e) => {
            const el = e.currentTarget;
            el.onerror = null;
            el.src = 'https://placehold.co/400x560?text=No+Image';
          }}
        />
      </div>
      <h3 className="recommend-name">{rb.title}</h3>
      <div className="recommend-price-row">
        <span className="recommend-current-price">{formatPrice(salePrice)}</span>
        {disc > 0 && (
          <span className="recommend-discount" aria-hidden>
            -{disc}%
          </span>
        )}
      </div>
      {disc > 0 && listPrice > 0 && <div className="recommend-old-price">{formatPrice(listPrice)}</div>}
      {(rating > 0 || sold > 0) && (
        <div className="recommend-meta">
          {rating > 0 && (
            <span className="recommend-meta-stars" aria-label={`${rating} sao`}>
              {[1, 2, 3, 4, 5].map((s) => (
                <img
                  key={s}
                  src="/icon/book_details/star.svg"
                  alt=""
                  className="recommend-star"
                  style={{ opacity: s <= Math.round(rating) ? 1 : 0.2 }}
                />
              ))}
            </span>
          )}
          {sold > 0 && (
            <span className="recommend-meta-sold">
              Đã bán{' '}
              {sold >= 1000 ? `${(sold / 1000).toFixed(1).replace(/\.0$/, '')}k` : `${sold}+`}
            </span>
          )}
        </div>
      )}
    </NavLink>
  );
}
