import { httpRequest } from './httpClient';
import type { Order } from '../context/BookstoreContext';

interface OrdersResponse {
  items: Order[];
}

interface OrderResponse {
  item: Order;
}

export async function getOrders(token: string): Promise<Order[]> {
  const data = await httpRequest<OrdersResponse>('/orders', { token });
  return data.items || [];
}

export async function createOrderRequest(token: string, payload: Record<string, unknown>): Promise<Order> {
  const data = await httpRequest<OrderResponse>('/orders', {
    method: 'POST',
    token,
    body: JSON.stringify(payload)
  });
  return data.item;
}

export async function updateOrderStatusRequest(token: string, orderId: string, status: string): Promise<Order> {
  const data = await httpRequest<OrderResponse>(`/orders/${orderId}/status`, {
    method: 'PATCH',
    token,
    body: JSON.stringify({ status })
  });
  return data.item;
}
