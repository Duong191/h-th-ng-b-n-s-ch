import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import RecommendationCard, { type RecommendationBook } from './RecommendationCard';
import { RECOMMENDATION_INITIAL_COUNT } from './constants';

export type RecommendationSectionProps = {
  title: string;
  books: RecommendationBook[];
  /** Số sản phẩm hiển thị trước khi bấm “Xem thêm” (mặc định 35 = 5×7) */
  initialCount?: number;
  moreHref?: string;
  moreLabel?: string;
  className?: string;
};

export default function RecommendationSection({
  title,
  books,
  initialCount = RECOMMENDATION_INITIAL_COUNT,
  moreHref = '/shop',
  moreLabel = 'Xem thêm',
  className = '',
}: RecommendationSectionProps) {
  const [expanded, setExpanded] = useState(false);

  const cap = Math.max(1, initialCount);
  const shownBooks = useMemo(() => {
    if (!books?.length) return [];
    if (expanded || books.length <= cap) return books;
    return books.slice(0, cap);
  }, [books, expanded, cap]);

  const showExpand = books.length > cap && !expanded;

  if (!books.length) return null;

  return (
    <div className={`recommend-block ${className}`.trim()}>
      <div className="recommend-section">
        <div className="recommend-header">
          <h2 className="recommend-title">{title}</h2>
        </div>
        <div className="recommend-panel">
          <div className="recommend-grid-wrap">
            <div className="recommend-grid">
              {shownBooks.map((book) => (
                <RecommendationCard key={String(book.id)} book={book} />
              ))}
            </div>
          </div>
          <div className="recommend-footer">
            {showExpand ? (
              <button type="button" className="recommend-expand-btn" onClick={() => setExpanded(true)}>
                {moreLabel}
              </button>
            ) : (
              <NavLink to={moreHref} className="recommend-more">
                {moreLabel}
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
