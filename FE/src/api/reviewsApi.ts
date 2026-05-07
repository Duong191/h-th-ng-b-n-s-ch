/**
 * File này chứa các hàm gọi API liên quan đến đánh giá sách.
 * Không xử lý UI, chỉ gửi request lấy/thêm/xóa review.
 */
import { httpRequest } from './httpClient';
import type { Review } from '../types/bookstore.types';

// Response danh sách review của một sách.
interface ReviewsResponse {
  items: Review[];
}

// Response một review đơn lẻ (khi tạo/cập nhật).
interface ReviewResponse {
  item: Review;
}

/**
 * Lấy danh sách đánh giá theo `bookId`.
 * Endpoint public: /books/:bookId/reviews
 */
export async function getBookReviews(bookId: string): Promise<Review[]> {
  const data = await httpRequest<ReviewsResponse>(`/books/${bookId}/reviews`);
  return data.items || [];
}

/**
 * Thêm mới hoặc cập nhật review của user hiện tại cho một cuốn sách.
 * Yêu cầu token đăng nhập.
 */
export async function upsertBookReview(
  token: string,
  bookId: string,
  payload: { rating: number; comment?: string }
): Promise<Review> {
  const data = await httpRequest<ReviewResponse>(`/books/${bookId}/reviews`, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
  return data.item;
}

/**
 * Xóa review theo `reviewId` của một cuốn sách.
 * Yêu cầu token đăng nhập (và quyền phù hợp ở backend).
 */
export async function deleteBookReview(token: string, bookId: string, reviewId: string): Promise<void> {
  await httpRequest(`/books/${bookId}/reviews/${reviewId}`, {
    method: 'DELETE',
    token,
  });
}
