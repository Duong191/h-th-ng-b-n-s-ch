/** File này xử lý API tồn kho và giao dịch nhập/xuất kho. */
import { Request, Response } from "express";
import * as inventoryService from "../services/inventory.service";

export const listInventory = async (req: Request, res: Response) => {
  const data = await inventoryService.listInventory(req.query as Record<string, unknown>);
  res.json(data);
};

export const createInventoryTransaction = async (req: Request, res: Response) => {
  await inventoryService.createInventoryTransaction({ ...req.body, createdBy: req.user!.id });
  res.status(201).json({ message: "Inventory transaction created" });
};
