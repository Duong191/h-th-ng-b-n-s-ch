/** File này kiểm tra role/permission trước khi cho truy cập route. */
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";

const KNOWN_ROLES = new Set(["admin", "staff", "user"]);

/**
 * Kiểm tra một mục trong danh sách yêu cầu (role name hoặc permission name).
 * Admin luôn được qua (toàn quyền).
 */
const userSatisfies = (roles: string[], permissions: string[], required: string): boolean => {
  if (roles.includes("admin")) return true;
  if (KNOWN_ROLES.has(required)) {
    return roles.includes(required);
  }
  return permissions.includes(required);
};

/**
 * Yêu cầu ít nhất một trong các role hoặc permission được liệt kê (OR).
 * Ví dụ: checkPermission(["admin", "staff"]) hoặc checkPermission(["orders.update"]).
 */
export const checkPermission = (required: string | string[]) => {
  const requiredList = Array.isArray(required) ? required : [required];

  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError(401, "Unauthorized"));
      return;
    }

    const { roles, permissions } = req.user;
    const ok = requiredList.some((item) => userSatisfies(roles, permissions, item));

    if (!ok) {
      next(new AppError(403, "Forbidden"));
      return;
    }

    next();
  };
};

/** Chỉ role (bất kỳ role nào trong danh sách). */
export const requireRoles = (...roleNames: string[]) => {
  return checkPermission(roleNames);
};

/** Chỉ permission — admin vẫn bypass qua userSatisfies. */
export const requirePermissions = (...permissionNames: string[]) => {
  return checkPermission(permissionNames);
};
