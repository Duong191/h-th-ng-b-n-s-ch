import { Router } from "express";
import { z } from "zod";
import * as bookController from "../controllers/book.controller";
import * as inventoryController from "../controllers/inventory.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { checkPermission } from "../middlewares/checkPermission";
import { validateRequest } from "../middlewares/validateRequest";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();
router.use(authMiddleware);
router.use(checkPermission(["admin", "staff"]));

router.post(
  "/books",
  validateRequest(
    z.object({
      body: z.object({
        title: z.string().min(1),
        author: z.string().min(1),
        categoryId: z.number().int().positive(),
        price: z.number().nonnegative(),
        stock: z.number().int().nonnegative(),
        isbn: z.string().optional(),
        publisher: z.string().optional(),
        publishDate: z.string().optional(),
        description: z.string().optional()
      })
    })
  ),
  asyncHandler(bookController.createBook)
);
router.put("/books/:id", asyncHandler(bookController.updateBook));
router.delete("/books/:id", asyncHandler(bookController.deleteBook));

router.get("/inventory", asyncHandler(inventoryController.listInventory));
router.post(
  "/inventory",
  validateRequest(
    z.object({
      body: z.object({
        bookId: z.number().int().positive(),
        transactionType: z.enum(["import", "export", "adjustment"]),
        quantity: z.number().int(),
        importPrice: z.number().nonnegative().optional(),
        supplierId: z.number().int().positive().optional(),
        note: z.string().optional()
      })
    })
  ),
  asyncHandler(inventoryController.createInventoryTransaction)
);

export default router;
