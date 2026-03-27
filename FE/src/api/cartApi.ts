import { httpRequest } from './httpClient';
import type { CartItemWithDetails } from '../context/BookstoreContext';

interface CartResponse {
  items: CartItemWithDetails[];
}

interface CartPayload {
  items: Array<{
    bookId: string;
    quantity: number;
  }>;
}

interface CartRequestOptions {
  token?: string;
  guestSessionId?: string;
}

function buildHeaders(guestSessionId?: string): Record<string, string> {
  return guestSessionId ? { 'X-Guest-Session': guestSessionId } : {};
}

export async function getCartRequest(options: CartRequestOptions = {}): Promise<CartItemWithDetails[]> {
  const data = await httpRequest<CartResponse>('/cart', {
    token: options.token,
    headers: buildHeaders(options.guestSessionId),
  });
  return data.items || [];
}

export async function updateCartRequest(payload: CartPayload, options: CartRequestOptions = {}): Promise<CartItemWithDetails[]> {
  const data = await httpRequest<CartResponse>('/cart', {
    method: 'PUT',
    token: options.token,
    headers: buildHeaders(options.guestSessionId),
    body: JSON.stringify(payload),
  });
  return data.items || [];
}
