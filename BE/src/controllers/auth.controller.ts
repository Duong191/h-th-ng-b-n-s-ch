import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  res.status(201).json(result);
};

export const login = async (req: Request, res: Response) => {
  const result = await authService.login(req.body.email, req.body.password);
  res.json(result);
};

export const refresh = async (req: Request, res: Response) => {
  const token = req.body.refreshToken;
  const result = await authService.refresh(token);
  res.json(result);
};

export const logout = async (req: Request, res: Response) => {
  await authService.logout(req.body.refreshToken);
  res.status(204).send();
};
