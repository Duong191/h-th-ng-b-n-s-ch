import { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useBookstore } from '../context/BookstoreContext';
import { getBestSellersByCategory } from '../services/booksService';
import { formatPrice, fixImagePath } from '../utils/format';

export default function BestsellerRankingPage() {
  const { data, loading } = useBookstore();
  const [category, setCategory] = useState('all');
  const books = data?.books || [];

  const ranking = useMemo(() => getBestSellersByCategory(books, category), [books, category]);

  if (loading) {
    return <div className="container" style={{ padding: 60 }}>Đang tải…</div>;
  }

  return (
    <div className="bestseller-ranking-page">
      <div className="container" style={{ padding: 40 }}>
        <h1>Bảng Xếp Hạng Bán Chạy</h1>
        <div style={{ marginTop: 30 }}>
          <label>Danh mục: </label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">Tất cả</option>
            <option value="1">Văn học</option>
            <option value="2">Kinh tế</option>
            <option value="3">Khoa học</option>
            <option value="4">Lịch sử</option>
            <option value="5">Thiếu nhi</option>
            <option value="6">Ngoại ngữ</option>
            <option value="7">Tâm lý học</option>
            <option value="8">Công nghệ</option>
          </select>
        </div>
        <div style={{ marginTop: 40 }}>
          {ranking.length === 0 ? (
            <p>Không có sách trong danh mục này</p>
          ) : (
            ranking.map((book, index) => (
              <div key={book.id} style={{ borderBottom: '1px solid #eee', padding: 20, display: 'flex', gap: 20 }}>
                <div style={{ fontWeight: 'bold', fontSize: 24 }}>{index + 1}</div>
                <img
                  src={fixImagePath((book as any).images?.[0] || book.image)}
                  alt={book.title}
                  style={{ width: 60, height: 90, objectFit: 'cover' }}
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = 'https://placehold.co/240x320?text=No+Image';
                  }}
                />
                <div style={{ flex: 1 }}>
                  <NavLink to={`/books/${book.id}`}>
                    <h3>{book.title}</h3>
                  </NavLink>
                  <p>{book.author}</p>
                  <p>{formatPrice(book.price)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
