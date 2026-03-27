import { Request, Response } from "express";
import * as categoryService from "../services/category.service";

export const listCategories = async (_req: Request, res: Response) => {
  const data = await categoryService.listCategories();
  res.json(data);
};

export const listCategoriesDetailed = async (_req: Request, res: Response) => {
  const data = await categoryService.listCategoriesDetailed();
  res.json(data);
};
