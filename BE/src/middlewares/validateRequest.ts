import { NextFunction, Request, Response } from "express";
import { ZodError, ZodTypeAny } from "zod";
import { AppError } from "../utils/appError";

export const validateRequest = (schema: ZodTypeAny) => (req: Request, _res: Response, next: NextFunction): void => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      next(new AppError(400, error.issues.map((i) => i.message).join("; ")));
      return;
    }
    next(error);
  }
};
