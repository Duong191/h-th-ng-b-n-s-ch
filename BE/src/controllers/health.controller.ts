/** File này cung cấp endpoint health check cho app và database. */
import { Request, Response } from "express";
import { checkDbHealth } from "../services/health.service";

export const health = (_req: Request, res: Response) => {
  res.json({ status: "ok" });
};

export const healthDb = async (_req: Request, res: Response) => {
  const data = await checkDbHealth();
  res.json(data);
};
