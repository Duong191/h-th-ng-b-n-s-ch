import { useMemo, useState } from 'react';
import { NavLink, useSearchParams, useNavigate } from 'react-router-dom';
import { useBookstore } from '../context/BookstoreContext';
import BookCard from '../components/ui/BookCard';
import { filterBooks, searchBooks, sortBooks } from '../services/booksService';

export default function ShopPage() {
  const { data, loading, addToCart } = useBookstore();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const books = data?.books || [];
  const categories = data?.categories || [];

  const [sortBy, setSortBy] = useState('default');
  const selectedCategory = params.get('category') || 'all';
  const search = params.get('search') || '';
  const selectedPrice = params.get('price') || 'all';
  const selectedRating = params.get('rating') || 'all';

  const filtered = useMemo(() => {
    let list = filterBooks(books, selectedCategory, selectedPrice, selectedRating);
    if (search) list = searchBooks(list, search);
    return sortBooks(list, sortBy);
  }, [books, selectedCategory, selectedPrice, selectedRating, search, sortBy]);

  const handleCategoryChange = (catId: string) => {
    const newParams = new URLSearchParams(params);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setParams(newParams);
  };

  const handlePriceChange = (priceRange: string) => {
    const newParams = new URLSearchParams(params);
    if (priceRange === 'all') {
      newParams.delete('price');
    } else {
      newParams.set('price', priceRange);
    }
    setParams(newParams);
  };

  const handleRatingChange = (rating: string) => {
    const newParams = new URLSearchParams(params);
    if (rating === 'all') {
      newParams.delete('rating');
    } else {
      newParams.set('rating', rating);
    }
    setParams(newParams);
  };

  const clearFilters = () => {
    setParams({});
    setSortBy('default');
  };

  if (loading) {
    return <div className="container" style={{ padding: 60 }}>Đang tải…</div>;
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <NavLink to="/">Trang chủ</NavLink>
          <span>/</span>
          <span>Cửa hàng</span>
          {selectedCategory !== 'all' && categories.find(c => c.id === selectedCategory) && (
            <>
              <span>/</span>
              <span>{categories.find(c => c.id === selectedCategory)?.name}</span>
            </>
          )}
        </div>
      </div>

      {/* Shop Section */}
      <section className="shop-section">
        <div className="container">
          <div className="shop-layout">
            {/* Sidebar Filters */}
            <aside className="shop-sidebar">
              <div className="filter-widget">
                <h3>DANH MỤC</h3>
                <div className="category-list">
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={() => handleCategoryChange('all')}
                    />
                    <span>Tất cả</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat.id}>
                      <input
                        type="radio"
                        name="category"
                        value={cat.id}
                        checked={selectedCategory === cat.id}
                        onChange={() => handleCategoryChange(cat.id)}
                      />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-widget">
                <h3>KHOẢNG GIÁ</h3>
                <div className="price-filter">
                  <label>
                    <input
                      type="radio"
                      name="price"
                      value="all"
                      checked={selectedPrice === 'all'}
                      onChange={() => handlePriceChange('all')}
                    />
                    <span>Tất cả</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="price"
                      value="0-100000"
                      checked={selectedPrice === '0-100000'}
                      onChange={() => handlePriceChange('0-100000')}
                    />
                    <span>Dưới 100.000đ</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="price"
                      value="100000-200000"
                      checked={selectedPrice === '100000-200000'}
                      onChange={() => handlePriceChange('100000-200000')}
                    />
                    <span>100.000đ - 200.000đ</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="price"
                      value="200000-500000"
                      checked={selectedPrice === '200000-500000'}
                      onChange={() => handlePriceChange('200000-500000')}
                    />
                    <span>200.000đ - 500.000đ</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="price"
                      value="500000-1000000"
                      checked={selectedPrice === '500000-1000000'}
                      onChange={() => handlePriceChange('500000-1000000')}
                    />
                    <span>Trên 500.000đ</span>
                  </label>
                </div>
              </div>

              <div className="filter-widget">
                <h3>ĐÁNH GIÁ</h3>
                <div className="rating-filter">
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="all"
                      checked={selectedRating === 'all'}
                      onChange={() => handleRatingChange('all')}
                    />
                    <span>Tất cả</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="5"
                      checked={selectedRating === '5'}
                      onChange={() => handleRatingChange('5')}
                    />
                    <span>⭐⭐⭐⭐⭐</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="4"
                      checked={selectedRating === '4'}
                      onChange={() => handleRatingChange('4')}
                    />
                    <span>⭐⭐⭐⭐ trở lên</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="3"
                      checked={selectedRating === '3'}
                      onChange={() => handleRatingChange('3')}
                    />
                    <span>⭐⭐⭐ trở lên</span>
                  </label>
                </div>
              </div>

              <button className="btn btn-secondary btn-block" onClick={clearFilters}>
                Xóa Bộ Lọc
              </button>
            </aside>

            {/* Main Content */}
            <div className="shop-main">
              <div className="shop-header">
                <div className="shop-info">
                  <p>Hiển thị <span>{filtered.length}</span> kết quả</p>
                </div>
                <div className="shop-sort">
                  <label>Sắp xếp:</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="default">Mặc định</option>
                    <option value="name-asc">Tên A-Z</option>
                    <option value="name-desc">Tên Z-A</option>
                    <option value="price-asc">Giá thấp đến cao</option>
                    <option value="price-desc">Giá cao đến thấp</option>
                    <option value="rating">Đánh giá cao nhất</option>
                    <option value="newest">Mới nhất</option>
                  </select>
                </div>
              </div>

              <div className="books-grid">
                {filtered.length === 0 ? (
                  <p>Không tìm thấy sản phẩm nào</p>
                ) : (
                  filtered.map((book) => <BookCard key={book.id} book={book as any} onAddToCart={addToCart} />)
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
