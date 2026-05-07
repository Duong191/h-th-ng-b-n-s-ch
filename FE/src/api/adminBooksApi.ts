/**
 * File này chứa các hàm gọi API liên quan đến quản lý sách phía admin.
 * Không xử lý UI, chỉ gửi request tới backend và chuẩn hóa dữ liệu trả về.
 */
import { httpRequest } from './httpClient';
import type { Book } from '../types/bookstore.types';
import { mapBook, type RawBook } from './publicApi';

// Kiểu response backend có thể bọc dữ liệu sách trong `item`.
interface BookResponseWrapped {
  item: Book;
}

// Backend có thể trả trực tiếp Book hoặc object bọc Book.
type BookResponse = Book | BookResponseWrapped;

// Chuẩn hóa response về một object sách thống nhất.
function unwrapBook(payload: BookResponse): unknown {
  return (payload as BookResponseWrapped).item ?? (payload as Book);
}

// Ánh xạ object backend sang kiểu Book frontend chuẩn.
function toClientBook(row: unknown): Book {
  return mapBook(row as RawBook) as Book;
}

/**
 * Gửi request tạo sách mới.
 * Dùng cho trang AdminBooksPage/AdminBookEditPage.
 * Yêu cầu token admin/staff để xác thực.
 */
export async function createBookRequest(token: string, payload: Record<string, unknown>): Promise<Book> {
  const data = await httpRequest<BookResponse>('/admin/books', {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
  // Chuẩn hóa dữ liệu backend trả về sang định dạng Book dùng ở frontend.
  return toClientBook(unwrapBook(data));
}

/**
 * Gửi request cập nhật thông tin sách theo `bookId`.
 * Dùng cho trang chỉnh sửa sách admin.
 * Yêu cầu token admin/staff.
 */
export async function updateBookRequest(token: string, bookId: string, payload: Record<string, unknown>): Promise<Book> {
  const data = await httpRequest<BookResponse>(`/admin/books/${bookId}`, {
    method: 'PUT',
    token,
    body: JSON.stringify(payload),
  });
  // Chuẩn hóa dữ liệu backend trả về sang định dạng Book dùng ở frontend.
  return toClientBook(unwrapBook(data));
}

/**
 * Gửi request xóa sách theo `bookId`.
 * Yêu cầu token admin/staff.
 */
export async function deleteBookRequest(token: string, bookId: string): Promise<void> {
  await httpRequest(`/admin/books/${bookId}`, {
    method: 'DELETE',
    token,
  });
}
