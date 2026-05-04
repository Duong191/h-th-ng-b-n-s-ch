/** File này xử lý API hồ sơ người dùng hiện tại (me). */
import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const getMe = async (req: Request, res: Response) => {
  const data = await userService.getMe(req.user!.id);
  res.json({ item: data });
};

export const updateMe = async (req: Request, res: Response) => {
  const data = await userService.updateMe(req.user!.id, req.body);
  res.json({ item: data });
};
