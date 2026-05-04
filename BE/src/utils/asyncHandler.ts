/** File này bọc hàm async để tự động chuyển lỗi về middleware error. */
/**
 * Bao một controller async để mọi `throw` / Promise reject
 * đều chạy về `next(err)` thay vì làm crash request.
 * Tránh phải lặp `try/catch` trong từng controller.
 */
import { NextFunction, Request, Response } from "express";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const asyncHandler = (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction): void => {
  fn(req, res, next).catch(next);
};
