import { Router } from "express";
import { z } from "zod";
import * as controller from "../controllers/auth.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.post(
  "/register",
  validateRequest(
    z.object({
      body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        phone: z.string().optional()
      })
    })
  ),
  asyncHandler(controller.register)
);
router.post(
  "/login",
  validateRequest(z.object({ body: z.object({ email: z.string().email(), password: z.string().min(1) }) })),
  asyncHandler(controller.login)
);
router.post("/refresh", validateRequest(z.object({ body: z.object({ refreshToken: z.string().min(1) }) })), asyncHandler(controller.refresh));
router.post("/logout", validateRequest(z.object({ body: z.object({ refreshToken: z.string().min(1) }) })), asyncHandler(controller.logout));

export default router;
