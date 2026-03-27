import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";

export const checkPermission = (required: string | string[]) => {
  const requiredPermissions = Array.isArray(required) ? required : [required];

  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError(401, "Unauthorized"));
      return;
    }

    const has = requiredPermissions.some(
      (permission) => req.user?.permissions.includes(permission) || req.user?.roles.includes(permission)
    );

    if (!has) {
      next(new AppError(403, "Forbidden"));
      return;
    }

    next();
  };
};
