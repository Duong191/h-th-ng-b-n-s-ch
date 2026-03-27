import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useBookstore } from '../../context/BookstoreContext';
import { formatDateTime, fixImagePath } from '../../utils/format';

export default function AdminBlogPage() {
  const { data, deleteBlog, showToast } = useBookstore();
  const blogs = data?.blogs || [];
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = useMemo(() => {
    if (!searchTerm.trim()) return blogs;
    const term = searchTerm.toLowerCase();
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(term) ||
        blog.author.toLowerCase().includes(term) ||
        blog.excerpt.toLowerCase().includes(term)
    );
  }, [blogs, searchTerm]);

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa bài viết "${title}"?`)) {
      if (await Promise.resolve(deleteBlog(id))) {
        showToast('Đã xóa bài viết', 'success');
      }
    }
  };

  return (
    <>
      {/* Search and Filter */}
      <div className="admin-search-filter">
        <div className="admin-search">
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-admin btn-admin-secondary" style={{ marginRight: 10 }} onClick={() => window.location.reload()}>
          <i className="fas fa-sync-alt"></i> Làm mới
        </button>
        <NavLink to="/admin/blog/new" className="btn-admin btn-admin-primary">
          <i className="fas fa-plus"></i> Thêm bài viết mới
        </NavLink>
      </div>

      {/* Blog Table */}
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h3>Danh sách bài viết (<span>{filteredBlogs.length}</span>)</h3>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tiêu đề</th>
              <th>Tác giả</th>
              <th>Danh mục</th>
              <th>Lượt xem</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  {searchTerm ? 'Không tìm thấy bài viết nào' : 'Chưa có bài viết nào'}
                </td>
              </tr>
            ) : (
              filteredBlogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <img
                      src={fixImagePath(blog.image)}
                      alt={blog.title}
                      style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 5 }}
                    />
                  </td>
                  <td>{blog.title}</td>
                  <td>{blog.author}</td>
                  <td>{blog.category || 'N/A'}</td>
                  <td>{blog.views}</td>
                  <td>{formatDateTime(blog.createdAt)}</td>
                  <td>
                    <NavLink to={`/admin/blog/${blog.id}/edit`} className="btn-admin btn-admin-primary" style={{ padding: '5px 10px', fontSize: '0.85rem', marginRight: 5 }}>
                      <i className="fas fa-edit"></i>
                    </NavLink>
                    <button onClick={() => handleDelete(blog.id, blog.title)} className="btn-admin btn-admin-danger" style={{ padding: '5px 10px', fontSize: '0.85rem' }}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
