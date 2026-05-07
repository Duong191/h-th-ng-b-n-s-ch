/**
 * File này chứa các hàm gọi API liên quan đến giỏ hàng.
 * Không xử lý UI, chỉ gửi request và trả về danh sách cart item theo chuẩn frontend.
 */
import { httpRequest } from './httpClient';
import type { CartItemWithDetails } from '../types/bookstore.types';

// Response giỏ hàng từ backend.
interface CartResponse {
  items: CartItemWithDetails[];
}

// Payload cập nhật giỏ hàng: backend nhận mảng dòng sách + số lượng.
interface CartPayload {
  items: Array<{
    bookId: number;
    quantity: number;
  }>;
}

// Tùy chọn gọi API cart: user token hoặc guest session.
interface CartRequestOptions {
  token?: string;
  guestSessionId?: string;
}

/** Gắn header guest session khi chưa đăng nhập. */
function buildHeaders(guestSessionId?: string): Record<string, string> {
  return guestSessionId ? { 'X-Guest-Session': guestSessionId } : {};
}

/** Lấy giỏ hàng hiện tại (user hoặc guest). */
export async function getCartRequest(options: CartRequestOptions = {}): Promise<CartItemWithDetails[]> {
  const data = await httpRequest<CartResponse>('/cart', {
    token: options.token,
    headers: buildHeaders(options.guestSessionId),
  });
  return data.items || [];
}

/**
 * Ghi đè toàn bộ giỏ hàng theo payload mới.
 * Dùng cho đồng bộ quantity/remove phía frontend sau khi người dùng thao tác.
 */
export async function updateCartRequest(payload: CartPayload, options: CartRequestOptions = {}): Promise<CartItemWithDetails[]> {
  const data = await httpRequest<CartResponse>('/cart', {
    method: 'PUT',
    token: options.token,
    headers: buildHeaders(options.guestSessionId),
    body: JSON.stringify(payload),
  });
  return data.items || [];
}
