import { httpRequest } from './httpClient';
import type { Book } from '../context/BookstoreContext';
import { mapBook, type RawBook } from './publicApi';

interface BookResponseWrapped {
  item: Book;
}

type BookResponse = Book | BookResponseWrapped;

function unwrapBook(payload: BookResponse): unknown {
  return (payload as BookResponseWrapped).item ?? (payload as Book);
}

function toClientBook(row: unknown): Book {
  return mapBook(row as RawBook) as Book;
}

export async function createBookRequest(token: string, payload: Record<string, unknown>): Promise<Book> {
  const data = await httpRequest<BookResponse>('/admin/books', {
    method: 'POST',
    token,
    body: JSON.stringify(payload)
  });
  return toClientBook(unwrapBook(data));
}

export async function updateBookRequest(token: string, bookId: string, payload: Record<string, unknown>): Promise<Book> {
  const data = await httpRequest<BookResponse>(`/admin/books/${bookId}`, {
    method: 'PUT',
    token,
    body: JSON.stringify(payload)
  });
  return toClientBook(unwrapBook(data));
}

export async function deleteBookRequest(token: string, bookId: string): Promise<void> {
  await httpRequest(`/admin/books/${bookId}`, {
    method: 'DELETE',
    token
  });
}
