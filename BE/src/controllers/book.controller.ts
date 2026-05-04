/** File này xử lý API sách: danh sách, chi tiết và CRUD cho admin. */
import { Request, Response } from "express";
import * as bookService from "../services/book.service";

export const listBooks = async (req: Request, res: Response) => {
  const data = await bookService.listBooks(req.query as Record<string, unknown>);
  res.json(data);
};

export const getBookById = async (req: Request, res: Response) => {
  const data = await bookService.getBookById(Number(req.params.id));
  res.json(data);
};

export const createBook = async (req: Request, res: Response) => {
  const data = await bookService.createBook(req.body);
  res.status(201).json(data);
};

export const updateBook = async (req: Request, res: Response) => {
  const data = await bookService.updateBook(Number(req.params.id), req.body);
  res.json(data);
};

export const deleteBook = async (req: Request, res: Response) => {
  await bookService.deleteBook(Number(req.params.id));
  res.status(204).send();
};
