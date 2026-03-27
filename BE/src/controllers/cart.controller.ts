import { Request, Response } from "express";
import * as cartService from "../services/cart.service";
import { AppError } from "../utils/appError";

const getCartIdentity = (req: Request) => {
  const userId = req.user?.id ?? null;
  const sessionId = (req.headers["x-guest-session"] as string | undefined) ?? null;
  if (!userId && !sessionId) throw new AppError(400, "Need Bearer token or X-Guest-Session header");
  return { userId, sessionId };
};

export const getCart = async (req: Request, res: Response) => {
  const { userId, sessionId } = getCartIdentity(req);
  const data = await cartService.getCart(userId, sessionId);
  res.json(data);
};

export const upsertCart = async (req: Request, res: Response) => {
  const { userId, sessionId } = getCartIdentity(req);
  const data = await cartService.upsertCart(userId, sessionId, req.body.items);
  res.json(data);
};
