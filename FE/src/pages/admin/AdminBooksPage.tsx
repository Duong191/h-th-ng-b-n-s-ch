import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useBookstore } from '../../context/BookstoreContext';
import { formatPrice, fixImagePath } from '../../utils/format';

export default function AdminBooksPage() {
  const { data, deleteBook, showToast } = useBookstore();
  const books = data?.books || [];
  const categories = data?.categories || [];
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = useMemo(() => {
    if (!searchTerm.trim()) return books;
    const term = searchTerm.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        (book.isbn && book.isbn.toLowerCase().includes(term))
    );
  }, [books, searchTerm]);

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa sách "${title}"?`)) {
      if (await Promise.resolve(deleteBook(id))) {
        showToast('Đã xóa sách', 'success');
      }
    }
  };

  const getCategoryName = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.name || 'N/A';
  };

  return (
    <>
      {/* Search and Filter */}
      <div className="admin-search-filter">
        <div className="admin-search">
          <input
            type="text"
            placeholder="Tìm kiếm sách..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-admin btn-admin-secondary" style={{ marginRight: 10 }} onClick={() => window.location.reload()}>
          <i className="fas fa-sync-alt"></i> Làm mới
        </button>
        <NavLink to="/admin/books/new" className="btn-admin btn-admin-primary">
          <i className="fas fa-plus"></i> Thêm sách mới
        </NavLink>
      </div>

      {/* Books Table */}
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h3>Danh sách sách (<span>{filteredBooks.length}</span>)</h3>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sách</th>
              <th>Tác giả</th>
              <th>Danh mục</th>
              <th>Giá nhập</th>
              <th>Giá bán</th>
              <th>Lãi/cuốn</th>
              <th>Giảm giá</th>
              <th>Tồn kho</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center">
                  {searchTerm ? 'Không tìm thấy sách nào' : 'Chưa có sách nào'}
                </td>
              </tr>
            ) : (
              filteredBooks.map((book) => {
                const imgRaw = (book as any).images?.[0] || book.image;
                const img = fixImagePath(imgRaw);
                const categoryId = (book as any).category || book.categoryId;
                const profit = book.importPrice ? book.price - book.importPrice : book.price;
                const profitPercent = book.importPrice ? ((profit / book.importPrice) * 100).toFixed(0) : 0;
                return (
                  <tr key={book.id}>
                    <td>
                      <img src={img} alt={book.title} style={{ width: 50, height: 75, objectFit: 'cover', borderRadius: 5 }} />
                    </td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{getCategoryName(categoryId)}</td>
                    <td style={{ color: book.importPrice ? '#666' : '#e74c3c', fontWeight: book.importPrice ? 'normal' : 'bold' }}>
                      {book.importPrice ? formatPrice(book.importPrice) : 'Chưa có'}
                    </td>
                    <td>{formatPrice(book.price)}</td>
                    <td style={{ color: profit > 0 ? '#27ae60' : '#e74c3c', fontWeight: 'bold' }}>
                      {book.importPrice ? (
                        <>
                          {formatPrice(profit)} <small>({profitPercent}%)</small>
                        </>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>{book.discount}%</td>
                    <td>{book.stock}</td>
                    <td>
                      <NavLink to={`/admin/books/${book.id}/edit`} className="btn-admin btn-admin-primary" style={{ padding: '5px 10px', fontSize: '0.85rem', marginRight: 5 }}>
                        <i className="fas fa-edit"></i>
                      </NavLink>
                      <button onClick={() => handleDelete(book.id, book.title)} className="btn-admin btn-admin-danger" style={{ padding: '5px 10px', fontSize: '0.85rem' }}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
