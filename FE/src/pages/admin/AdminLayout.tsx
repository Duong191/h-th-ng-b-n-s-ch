import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useBookstore } from '../../context/BookstoreContext';
import { useEffect, useMemo } from 'react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const { currentUser, logout, data, refreshBooksFromApi } = useBookstore();
  
  const pendingOrdersCount = useMemo(() => {
    return (data?.orders || []).filter(order => order.status === 'pending').length;
  }, [data?.orders]);

  const outOfStockBooks = useMemo(
    () => (data?.books || []).filter((b) => b && Number(b.stock) <= 0),
    [data?.books]
  );

  useEffect(() => {
    if (currentUser?.role === 'admin' || currentUser?.role === 'staff') {
      refreshBooksFromApi();
    }
  }, [currentUser?.role, refreshBooksFromApi]);

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>
            <img src="/icon/book.jpg" alt="Bookarazi Admin" className="logo-img" />
            <span>Bookarazi Admin</span>
          </h2>
        </div>
        <nav className="admin-sidebar-nav">
          <NavLink to="/admin/dashboard" className="admin-nav-item">
            <i className="fas fa-home"></i>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/books" className="admin-nav-item">
            <i className="fas fa-book"></i>
            <span>Quản lý Sách</span>
          </NavLink>
          <NavLink to="/admin/inventory" className="admin-nav-item">
            <i className="fas fa-warehouse"></i>
            <span>Quản lý Kho</span>
          </NavLink>
          <NavLink to="/admin/blog" className="admin-nav-item">
            <i className="fas fa-blog"></i>
            <span>Quản lý Blog</span>
          </NavLink>
          <NavLink to="/admin/orders" className="admin-nav-item" style={{ position: 'relative' }}>
            <i className="fas fa-shopping-cart"></i>
            <span>Quản lý Đơn hàng</span>
            {pendingOrdersCount > 0 && (
              <span className="cart-badge" style={{ position: 'absolute', top: '10px', right: '15px', fontSize: '11px' }}>
                {pendingOrdersCount}
              </span>
            )}
          </NavLink>
          <NavLink to="/" className="admin-nav-item">
            <i className="fas fa-arrow-left"></i>
            <span>Về Trang Chủ</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header-left">
            <button className="mobile-sidebar-toggle" id="mobileSidebarToggle">
              <i className="fas fa-bars"></i>
            </button>
            <h1 className="admin-header-title">Admin Panel</h1>
          </div>
          <div className="admin-header-right">
            <div className="admin-user-info">
              <div className="admin-user-avatar">
                {currentUser?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <span>{currentUser?.name || 'Admin'}</span>
            </div>
            <button className="admin-logout-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Đăng xuất
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="admin-content">
          {outOfStockBooks.length > 0 && (
            <div
              role="alert"
              style={{
                margin: '0 0 16px',
                padding: '12px 16px',
                background: '#fff3cd',
                border: '1px solid #ffc107',
                borderRadius: 8,
                color: '#856404',
              }}
            >
              <strong>Cảnh báo tồn kho:</strong> có {outOfStockBooks.length} đầu sách đang{' '}
              <strong>hết hàng</strong> (tồn = 0). Vui lòng nhập thêm tại Quản lý kho hoặc cập nhật sách.
              <ul style={{ margin: '8px 0 0 18px' }}>
                {outOfStockBooks.slice(0, 8).map((b) => (
                  <li key={b.id}>
                    {b.title} (mã #{b.id})
                  </li>
                ))}
              </ul>
              {outOfStockBooks.length > 8 && <span>… và {outOfStockBooks.length - 8} đầu sách khác.</span>}
            </div>
          )}
          <Outlet />
        </div>
      </main>
    </div>
  );
}
