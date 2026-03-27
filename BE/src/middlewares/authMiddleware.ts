import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { AppError } from "../utils/appError";
import { getUserAuthData } from "../services/rbac.service";

export const authMiddleware = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      throw new AppError(401, "Missing Bearer token");
    }

    const token = authHeader.slice(7);
    const payload = verifyAccessToken(token);
    const authData = await getUserAuthData(payload.sub);
    if (!authData) throw new AppError(401, "User no longer valid");

    req.user = authData;
    next();
  } catch (error) {
    next(error);
  }
};
