/** File này khai báo route thao tác thông tin người dùng hiện tại. */
import { Router } from "express";
import { z } from "zod";
import * as controller from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();
router.use(authMiddleware);
router.get("/me", asyncHandler(controller.getMe));
router.patch(
  "/me",
  validateRequest(
    z.object({
      body: z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        phone: z.string().optional(),
        gender: z.string().optional(),
        birthDate: z.string().optional(),
        avatarUrl: z.string().optional()
      })
    })
  ),
  asyncHandler(controller.updateMe)
);

export default router;
