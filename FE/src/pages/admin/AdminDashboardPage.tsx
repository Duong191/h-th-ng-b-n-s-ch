import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useBookstore } from '../../context/BookstoreContext';
import { formatPrice, formatDate, fixImagePath } from '../../utils/format';

export default function AdminDashboardPage() {
  const { data, getUserById, deleteBook, showToast } = useBookstore();

  const stats = useMemo(() => {
    const orders = data?.orders || [];
    const inventoryLogs = data?.inventoryLogs || [];
    
    const salesRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    
    const importCost = inventoryLogs
      .filter((log) => log.type === 'import' && log.importPrice)
      .reduce((sum, log) => sum + (log.importPrice! * log.quantity), 0);
    
    const netRevenue = salesRevenue - importCost;
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    
    return {
      totalBooks: data?.books?.length || 0,
      totalOrders: orders.length,
      pendingOrders,
      totalUsers: data?.users?.length || 0,
      salesRevenue,
      importCost,
      netRevenue,
    };
  }, [data]);

  const recentOrders = useMemo(() => {
    return (data?.orders || [])
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [data]);

  const bestSellingBooks = useMemo(() => {
    return (data?.books || [])
      .filter((book: any) => (book.salesCount || 0) > 0)
      .sort((a: any, b: any) => (b.salesCount || 0) - (a.salesCount || 0))
      .slice(0, 5);
  }, [data]);

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { label: string; className: string }> = {
      pending: { label: 'Chờ xử lý', className: 'badge-warning' },
      processing: { label: 'Đang xử lý', className: 'badge-info' },
      shipping: { label: 'Đang giao', className: 'badge-primary' },
      completed: { label: 'Hoàn thành', className: 'badge-success' },
      cancelled: { label: 'Đã hủy', className: 'badge-danger' },
    };
    const badge = badges[status] || { label: status, className: 'badge' };
    return <span className={`badge ${badge.className}`}>{badge.label}</span>;
  };

  const handleDeleteBook = async (bookId: string, title: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa sách "${title}"?`)) return;
    const ok = await Promise.resolve(deleteBook(bookId));
    if (ok) showToast('Đã xóa sách', 'success');
    else showToast('Không thể xóa sách. Vui lòng thử lại.', 'error');
  };

  return (
    <>
      {/* Stats Cards */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon blue">
            <i className="fas fa-book"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalBooks}</h3>
            <p>Tổng số sách</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalOrders}</h3>
            <p>Tổng số đơn hàng</p>
            {stats.pendingOrders > 0 && (
              <p style={{ fontSize: '0.85rem', color: '#f39c12', marginTop: 8, fontWeight: 600 }}>
                <i className="fas fa-clock"></i> {stats.pendingOrders} đơn chờ xử lý
              </p>
            )}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalUsers}</h3>
            <p>Tổng số người dùng</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <h3>{formatPrice(stats.netRevenue)}</h3>
            <p>Lợi nhuận ròng</p>
            <div style={{ fontSize: '0.8rem', marginTop: 8, opacity: 0.9 }}>
              <div>Doanh thu: {formatPrice(stats.salesRevenue)}</div>
              <div>Chi phí: {formatPrice(stats.importCost)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h3>Đơn hàng gần đây</h3>
          <NavLink to="/admin/orders" className="btn-admin btn-admin-primary">
            <i className="fas fa-eye"></i> Xem tất cả
          </NavLink>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Ngày đặt</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">
                  Chưa có đơn hàng nào
                </td>
              </tr>
            ) : (
              recentOrders.map((order) => {
                const user = getUserById(order.userId);
                return (
                  <tr key={order.id}>
                    <td>#{order.id.substring(0, 8)}</td>
                    <td>{user?.name || 'Khách'}</td>
                    <td>{formatPrice(order.total)}</td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>
                      <NavLink to={`/admin/orders`} className="btn-admin btn-admin-primary" style={{ padding: '5px 10px', fontSize: '0.85rem' }}>
                        <i className="fas fa-eye"></i>
                      </NavLink>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Best Selling Books */}
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h3>Sách bán chạy</h3>
          <NavLink to="/admin/books" className="btn-admin btn-admin-primary">
            <i className="fas fa-eye"></i> Xem tất cả
          </NavLink>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sách</th>
              <th>Tác giả</th>
              <th>Đã bán</th>
              <th>Giá</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {bestSellingBooks.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">
                  Chưa có dữ liệu
                </td>
              </tr>
            ) : (
              bestSellingBooks.map((book: any) => {
                const imgRaw = book.images?.[0] || book.image;
                const img = fixImagePath(imgRaw);
                const price = book.discount > 0 ? Math.round(book.price * (1 - book.discount / 100)) : book.price;
                return (
                  <tr key={book.id}>
                    <td>
                      <img
                        src={img}
                        alt={book.title}
                        style={{ width: 50, height: 70, objectFit: 'cover', borderRadius: 5 }}
                      />
                    </td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.salesCount || 0}</td>
                    <td>{formatPrice(price)}</td>
                    <td>
                      <NavLink to={`/admin/books/${book.id}/edit`} className="btn-admin btn-admin-primary" style={{ padding: '5px 10px', fontSize: '0.85rem', marginRight: 6 }}>
                        <i className="fas fa-edit"></i>
                      </NavLink>
                      <button
                        type="button"
                        className="btn-admin btn-admin-danger"
                        style={{ padding: '5px 10px', fontSize: '0.85rem' }}
                        onClick={() => handleDeleteBook(String(book.id), String(book.title))}
                      >
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
