/** File này trả phản hồi cho endpoint có trong spec nhưng chưa hỗ trợ. */
import { Request, Response } from "express";

export const schemaNotImplemented = (_req: Request, res: Response) => {
  res.status(501).json({
    message: "Endpoint exists in API spec but missing corresponding tables in current SQL schema (blogs/reviews)."
  });
};
