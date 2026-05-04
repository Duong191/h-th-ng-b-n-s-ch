/** File này định nghĩa lớp lỗi nghiệp vụ kèm HTTP status code. */
/**
 * Lỗi nghiệp vụ có HTTP status code đi kèm.
 * Dùng để phân biệt với lỗi hệ thống (lỗi không xác định → 500).
 *
 * Ví dụ:
 *   throw new AppError(404, "Book not found");
 *   throw new AppError(401, "Invalid credentials");
 */
export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
