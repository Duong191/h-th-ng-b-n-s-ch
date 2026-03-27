import { useMemo, useState } from 'react';
import { useBookstore } from '../../context/BookstoreContext';
import { formatPrice, formatDate, formatDateTime } from '../../utils/format';

export default function AdminOrdersPage() {
  const { data, updateOrder, getUserById, getBookById, showToast } = useBookstore();
  const orders = data?.orders || [];
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const filteredOrders = useMemo(() => {
    let filtered = orders;

    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((order) => {
        const user = getUserById(order.userId);
        return (
          order.id.toLowerCase().includes(term) ||
          user?.name.toLowerCase().includes(term) ||
          user?.email.toLowerCase().includes(term)
        );
      });
    }

    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [orders, searchTerm, statusFilter, getUserById]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const updated = await Promise.resolve(updateOrder(orderId, { status: newStatus as any }));
    if (updated) {
      showToast('Đã cập nhật trạng thái đơn hàng', 'success');
    } else {
      showToast('Không thể cập nhật trạng thái đơn hàng', 'error');
    }
  };

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

  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      {/* Filter */}
      <div className="admin-search-filter">
        <div className="admin-search">
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-admin btn-admin-secondary" style={{ marginRight: 10 }} onClick={() => window.location.reload()}>
          <i className="fas fa-sync-alt"></i> Làm mới
        </button>
        <select
          className="form-select"
          style={{ width: 200 }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chờ xử lý</option>
          <option value="processing">Đang xử lý</option>
          <option value="shipping">Đang giao</option>
          <option value="completed">Hoàn thành</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h3>Danh sách đơn hàng (<span>{filteredOrders.length}</span>)</h3>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Ngày đặt</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  {searchTerm || statusFilter ? 'Không tìm thấy đơn hàng nào' : 'Chưa có đơn hàng nào'}
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => {
                const user = getUserById(order.userId);
                const itemCount = order.items?.length || 0;
                return (
                  <tr key={order.id}>
                    <td>#{order.id.substring(0, 8)}</td>
                    <td>{user?.name || 'Khách'}</td>
                    <td>{itemCount} sản phẩm</td>
                    <td>{formatPrice(order.total)}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="form-select"
                        style={{ padding: '5px' }}
                      >
                        <option value="pending">Chờ xử lý</option>
                        <option value="processing">Đang xử lý</option>
                        <option value="shipping">Đang giao</option>
                        <option value="completed">Hoàn thành</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                    </td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>
                      <button
                        onClick={() => viewOrderDetails(order)}
                        className="btn-admin btn-admin-primary"
                        style={{ padding: '5px 10px', fontSize: '0.85rem' }}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          style={{
            display: 'flex',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 2000,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: 'white',
              padding: 30,
              borderRadius: 10,
              maxWidth: 800,
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>
            <h2>Chi tiết đơn hàng #{selectedOrder.id.substring(0, 8)}</h2>
            <div style={{ marginTop: 20 }}>
              <p>
                <strong>Khách hàng:</strong> {getUserById(selectedOrder.userId)?.name || 'Khách'}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrder.shippingAddress?.email || 'N/A'}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {selectedOrder.shippingAddress?.phone || 'N/A'}
              </p>
              <p>
                <strong>Địa chỉ giao hàng:</strong>{' '}
                {`${selectedOrder.shippingAddress?.street}, ${selectedOrder.shippingAddress?.city}, ${selectedOrder.shippingAddress?.state}`}
              </p>
              <p>
                <strong>Phương thức thanh toán:</strong> {selectedOrder.paymentMethod || 'N/A'}
              </p>
              <p>
                <strong>Trạng thái:</strong> {getStatusBadge(selectedOrder.status)}
              </p>
              <p>
                <strong>Ngày đặt:</strong> {formatDateTime(selectedOrder.createdAt)}
              </p>
              <h3 style={{ marginTop: 20 }}>Sản phẩm:</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ddd' }}>
                    <th style={{ padding: 10, textAlign: 'left' }}>Tên sách</th>
                    <th style={{ padding: 10, textAlign: 'center' }}>Số lượng</th>
                    <th style={{ padding: 10, textAlign: 'right' }}>Đơn giá</th>
                    <th style={{ padding: 10, textAlign: 'right' }}>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item: any) => {
                    const book = getBookById(item.bookId);
                    return (
                      <tr key={item.bookId} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: 10 }}>{book?.title || 'N/A'}</td>
                        <td style={{ padding: 10, textAlign: 'center' }}>{item.quantity}</td>
                        <td style={{ padding: 10, textAlign: 'right' }}>{formatPrice(item.price)}</td>
                        <td style={{ padding: 10, textAlign: 'right' }}>{formatPrice(item.price * item.quantity)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ borderTop: '2px solid #ddd', fontWeight: 'bold' }}>
                    <td colSpan={3} style={{ padding: 10, textAlign: 'right' }}>
                      Tổng cộng:
                    </td>
                    <td style={{ padding: 10, textAlign: 'right' }}>{formatPrice(selectedOrder.total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
