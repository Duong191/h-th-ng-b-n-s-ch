/** File này gom xử lý lỗi và route không tồn tại cho toàn hệ thống. */
/**
 * Middleware xử lý lỗi tập trung cho Express.
 * - `notFoundHandler`: bắt mọi route không khớp → ném 404 dạng AppError.
 * - `errorHandler`: ánh xạ lỗi nghiệp vụ (AppError) sang đúng status code,
 *   các lỗi còn lại trả 500 với thông điệp ngắn gọn.
 *
 * LƯU Ý PRODUCTION: ở 500 hiện tại đang trả `err.message`.
 * Khi triển khai thật nên ẩn chi tiết nội bộ và chỉ trả mã lỗi/short text.
 */
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";

// Bắt route không khai báo → trả 404 với URL người dùng truy cập
export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
  next(new AppError(404, `Not found: ${req.originalUrl}`));
};

// Đầu mối xử lý lỗi cuối cùng — phải có 4 tham số để Express nhận diện
export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  const message = err instanceof Error ? err.message : "Internal server error";
  res.status(500).json({ message });
};
