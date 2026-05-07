/**
 * File này chứa các hàm gọi API liên quan đến đơn hàng.
 * Không xử lý UI, chỉ gửi request tạo/lấy/cập nhật trạng thái đơn hàng.
 */
import { httpRequest } from './httpClient';
import type { Order } from '../types/bookstore.types';

// Response danh sách đơn hàng.
interface OrdersResponse {
  items: Order[];
}

// Response một đơn hàng đơn lẻ.
interface OrderResponse {
  item: Order;
}

/** Lấy danh sách đơn hàng của user hiện tại. */
export async function getOrders(token: string): Promise<Order[]> {
  // Endpoint trả list orders; backend có thể trả ở `items` hoặc `data`.
  const data = await httpRequest<OrdersResponse & { data?: Order[] }>('/orders?limit=200', { token });
  const raw = data.items ?? data.data;
  return Array.isArray(raw) ? raw : [];
}

/** Tạo đơn hàng mới; fallback từ `orderId` nếu backend chưa trả full `item`. */
export async function createOrderRequest(
  token: string,
  payload: Record<string, unknown>,
  clientOrder: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Order> {
  // Endpoint tạo đơn hàng mới.
  const data = await httpRequest<OrderResponse & { orderId?: number }>('/orders', {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });

  // Ưu tiên dùng item đầy đủ từ backend nếu có.
  if (data.item) return data.item;

  // Fallback khi backend chỉ trả `orderId` (đảm bảo UI vẫn có object Order để hiển thị).
  if (data.orderId != null) {
    const now = new Date().toISOString();
    return {
      ...clientOrder,
      id: String(data.orderId),
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };
  }
  throw new Error('Không tạo được đơn hàng');
}

/** Đổi trạng thái đơn hàng (luồng admin). */
export async function updateOrderStatusRequest(token: string, orderId: string, status: string): Promise<void> {
  // Endpoint đổi trạng thái đơn hàng cho luồng quản trị.
  await httpRequest(`/orders/${orderId}/status`, {
    method: 'PATCH',
    token,
    body: JSON.stringify({ status }),
  });
}

/** Khách xác nhận đã nhận hàng: shipping → completed (chỉ chủ đơn). */
export async function confirmOrderReceivedRequest(token: string, orderId: string): Promise<void> {
  // Endpoint xác nhận nhận hàng của user.
  await httpRequest(`/orders/${orderId}/confirm-received`, {
    method: 'POST',
    token,
  });
}
