import { FormEvent, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookstore } from '../../context/BookstoreContext';

export default function AdminBlogEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, addBlog, updateBlog, showToast } = useBookstore();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
  });

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit && id) {
      const blog = data?.blogs?.find((b) => b.id === id);
      if (blog) {
        setFormData({
          title: blog.title,
          author: blog.author,
          excerpt: blog.excerpt,
          content: blog.content,
          image: blog.image,
          category: blog.category || '',
        });
      }
    }
  }, [isEdit, id, data]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEdit && id) {
      await Promise.resolve(updateBlog(id, formData));
      showToast('Đã cập nhật bài viết', 'success');
    } else {
      await Promise.resolve(addBlog(formData));
      showToast('Đã thêm bài viết mới', 'success');
    }
    navigate('/admin/blog');
  };

  return (
    <div className="admin-blog-edit">
      <h1>{isEdit ? 'Sửa Bài Viết' : 'Thêm Bài Viết Mới'}</h1>
      <form onSubmit={onSubmit} style={{ maxWidth: 800, marginTop: 40 }}>
        <div className="form-group">
          <label>Tiêu đề *</label>
          <input
            type="text"
            className="form-input"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Tác giả *</label>
          <input
            type="text"
            className="form-input"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Trích dẫn *</label>
          <textarea
            className="form-input"
            rows={3}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Nội dung *</label>
          <textarea
            className="form-input"
            rows={10}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>URL Ảnh *</label>
          <input
            type="url"
            className="form-input"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Danh mục</label>
          <input
            type="text"
            className="form-input"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Cập nhật' : 'Thêm mới'}
        </button>
      </form>
    </div>
  );
}
