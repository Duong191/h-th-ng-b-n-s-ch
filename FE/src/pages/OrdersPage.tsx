import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useBookstore } from '../context/BookstoreContext';
import { formatPrice, formatDateTime } from '../utils/format';

export default function OrdersPage() {
  const { data, currentUser, getBookById, updateOrder, showToast } = useBookstore();

  const userOrders = useMemo(() => {
    if (!currentUser || !data) return [];
    return (data.orders || [])
      .filter((o) => o.userId === currentUser.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [data, currentUser]);

  const handleConfirmReceived = async (orderId: string) => {
    if (window.confirm('Xác nhận bạn đã nhận được hàng?')) {
      const updated = await Promise.resolve(updateOrder(orderId, { status: 'completed' }));
      if (updated) {
        showToast('Cảm ơn bạn đã xác nhận nhận hàng!', 'success');
      } else {
        showToast('Không thể cập nhật trạng thái đơn hàng', 'error');
      }
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Chờ xử lý',
      processing: 'Đang xử lý',
      shipping: 'Đang giao hàng',
      completed: 'Đã hoàn thành',
      cancelled: 'Đã hủy',
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: '#f39c12',
      processing: '#3498db',
      shipping: '#9b59b6',
      completed: '#27ae60',
      cancelled: '#e74c3c',
    };
    return colors[status] || '#666';
  };

  if (!currentUser) return <div className="container" style={{ padding: 60 }}>Loading...</div>;

  return (
    <div className="orders-page">
      <div className="container" style={{ padding: 40 }}>
        <h1>Đơn Hàng Của Tôi</h1>
        {userOrders.length === 0 ? (
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <p>Bạn chưa có đơn hàng nào</p>
            <NavLink to="/shop" className="btn btn-primary" style={{ marginTop: 20 }}>
              Mua sắm ngay
            </NavLink>
          </div>
        ) : (
          <div style={{ marginTop: 40 }}>
            {userOrders.map((order) => (
              <div key={order.id} style={{ border: '1px solid #ddd', marginBottom: 20, padding: 20, borderRadius: 8 }}>
                <div style={{ marginBottom: 15, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>Mã đơn:</strong> #{order.id}
                    <span style={{ marginLeft: 20 }}>
                      <strong>Ngày:</strong> {formatDateTime(order.createdAt)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      style={{
                        padding: '6px 12px',
                        borderRadius: 4,
                        backgroundColor: getStatusColor(order.status),
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                      }}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                    {order.status === 'shipping' && (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleConfirmReceived(order.id)}
                        style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                      >
                        <i className="fas fa-check"></i> Đã nhận được hàng
                      </button>
                    )}
                  </div>
                </div>
                <div style={{ backgroundColor: '#f9f9f9', padding: 15, borderRadius: 4 }}>
                  {order.items.map((item) => {
                    const book = getBookById(item.bookId);
                    return (
                      <div key={item.bookId} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>
                            <strong>{book?.title || 'N/A'}</strong> x {item.quantity}
                          </span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: 15, textAlign: 'right' }}>
                  <strong style={{ fontSize: '1.2rem' }}>Tổng: {formatPrice(order.total)}</strong>
                </div>
                {order.shippingAddress && (
                  <div style={{ marginTop: 15, fontSize: '0.9rem', color: '#666' }}>
                    <strong>Địa chỉ giao hàng:</strong>{' '}
                    {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
