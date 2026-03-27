import { httpRequest } from './httpClient';
import type { Book } from '../context/BookstoreContext';

interface BookResponseWrapped {
  item: Book;
}

type BookResponse = Book | BookResponseWrapped;

function unwrapBook(payload: BookResponse): Book {
  return (payload as BookResponseWrapped).item ?? (payload as Book);
}

export async function createBookRequest(token: string, payload: Record<string, unknown>): Promise<Book> {
  const data = await httpRequest<BookResponse>('/admin/books', {
    method: 'POST',
    token,
    body: JSON.stringify(payload)
  });
  return unwrapBook(data);
}

export async function updateBookRequest(token: string, bookId: string, payload: Record<string, unknown>): Promise<Book> {
  const data = await httpRequest<BookResponse>(`/admin/books/${bookId}`, {
    method: 'PUT',
    token,
    body: JSON.stringify(payload)
  });
  return unwrapBook(data);
}

export async function deleteBookRequest(token: string, bookId: string): Promise<void> {
  await httpRequest(`/admin/books/${bookId}`, {
    method: 'DELETE',
    token
  });
}
