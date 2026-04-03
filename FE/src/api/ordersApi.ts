import { httpRequest } from './httpClient';
import type { Order } from '../context/BookstoreContext';

interface OrdersResponse {
  items: Order[];
}

interface OrderResponse {
  item: Order;
}

export async function getOrders(token: string): Promise<Order[]> {
  const data = await httpRequest<OrdersResponse & { data?: Order[] }>('/orders?limit=200', { token });
  const raw = data.items ?? data.data;
  return Array.isArray(raw) ? raw : [];
}

export async function createOrderRequest(
  token: string,
  payload: Record<string, unknown>,
  clientOrder: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Order> {
  const data = await httpRequest<OrderResponse & { orderId?: number }>('/orders', {
    method: 'POST',
    token,
    body: JSON.stringify(payload)
  });
  if (data.item) return data.item;
  if (data.orderId != null) {
    const now = new Date().toISOString();
    return {
      ...clientOrder,
      id: String(data.orderId),
      status: 'pending',
      createdAt: now,
      updatedAt: now
    };
  }
  throw new Error('Không tạo được đơn hàng');
}

export async function updateOrderStatusRequest(token: string, orderId: string, status: string): Promise<void> {
  await httpRequest(`/orders/${orderId}/status`, {
    method: 'PATCH',
    token,
    body: JSON.stringify({ status })
  });
}

/** Khách xác nhận đã nhận hàng: shipping → completed (chỉ chủ đơn). */
export async function confirmOrderReceivedRequest(token: string, orderId: string): Promise<void> {
  await httpRequest(`/orders/${orderId}/confirm-received`, {
    method: 'POST',
    token
  });
}
