import { httpRequest } from './httpClient';
import type { Review } from '../context/BookstoreContext';

interface ReviewsResponse {
  items: Review[];
}

interface ReviewResponse {
  item: Review;
}

export async function getBookReviews(bookId: string): Promise<Review[]> {
  const data = await httpRequest<ReviewsResponse>(`/books/${bookId}/reviews`);
  return data.items || [];
}

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

export async function deleteBookReview(token: string, bookId: string, reviewId: string): Promise<void> {
  await httpRequest(`/books/${bookId}/reviews/${reviewId}`, {
    method: 'DELETE',
    token,
  });
}
