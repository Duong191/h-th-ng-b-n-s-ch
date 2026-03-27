import { Request, Response } from "express";
import * as orderService from "../services/order.service";

export const createOrder = async (req: Request, res: Response) => {
  const data = await orderService.createOrder(req.user!.id, req.body);
  res.status(201).json(data);
};

export const listOrders = async (req: Request, res: Response) => {
  const data = await orderService.listOrders(req.user!.id, req.query as Record<string, unknown>);
  res.json(data);
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  await orderService.updateOrderStatus(Number(req.params.id), req.body.status, req.body.note, req.user!.id);
  res.status(204).send();
};
