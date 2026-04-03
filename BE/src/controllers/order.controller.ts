import { Request, Response } from "express";
import * as orderService from "../services/order.service";
import { AppError } from "../utils/appError";

export const createOrder = async (req: Request, res: Response) => {
  const data = await orderService.createOrder(req.user!.id, req.body);
  res.status(201).json(data);
};

export const listOrders = async (req: Request, res: Response) => {
  const data = await orderService.listOrders(req.user!, req.query as Record<string, unknown>);
  res.json(data);
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  await orderService.updateOrderStatus(Number(req.params.id), req.body.status, req.body.note, req.user!.id);
  res.status(204).send();
};

export const confirmDeliveryByCustomer = async (req: Request, res: Response) => {
  const orderId = Number(req.params.id);
  if (!Number.isFinite(orderId)) throw new AppError(400, "Mã đơn hàng không hợp lệ");
  await orderService.confirmDeliveryByCustomer(req.user!.id, orderId);
  res.status(204).send();
};
