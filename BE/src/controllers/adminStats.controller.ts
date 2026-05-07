/** File này xử lý API thống kê gọn cho trang quản trị (dashboard). */
import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const getAdminStats = async (_req: Request, res: Response) => {
  const totalUsers = await userService.countActiveUsers();
  res.json({ totalUsers });
};
