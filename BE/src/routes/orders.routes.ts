import { Router } from "express";
import { z } from "zod";
import * as controller from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { checkPermission } from "../middlewares/checkPermission";
import { validateRequest } from "../middlewares/validateRequest";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();
router.use(authMiddleware);

router.post(
  "/",
  validateRequest(
    z.object({
      body: z.object({
        paymentMethod: z.string().min(1),
        shippingName: z.string().min(1),
        shippingPhone: z.string().min(1),
        shippingEmail: z.string().email().optional(),
        shippingAddress: z.string().min(1),
        shippingCity: z.string().min(1),
        shippingState: z.string().optional(),
        shippingZipcode: z.string().optional(),
        shippingCountry: z.string().optional(),
        note: z.string().optional()
      })
    })
  ),
  asyncHandler(controller.createOrder)
);
router.get("/", asyncHandler(controller.listOrders));
router.post("/:id/confirm-received", asyncHandler(controller.confirmDeliveryByCustomer));
router.patch(
  "/:id/status",
  checkPermission(["admin", "staff", "orders.update"]),
  validateRequest(z.object({ body: z.object({ status: z.string().min(1), note: z.string().optional() }) })),
  asyncHandler(controller.updateOrderStatus)
);

export default router;
