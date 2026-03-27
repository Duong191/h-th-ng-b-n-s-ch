import { Router } from "express";
import authRoutes from "./auth.routes";
import usersRoutes from "./users.routes";
import booksRoutes from "./books.routes";
import categoriesRoutes from "./categories.routes";
import cartRoutes from "./cart.routes";
import ordersRoutes from "./orders.routes";
import adminRoutes from "./admin.routes";
import { asyncHandler } from "../utils/asyncHandler";
import { schemaNotImplemented } from "../controllers/unsupported.controller";
import * as healthController from "../controllers/health.controller";

const router = Router();

router.get("/health", healthController.health);
router.get("/health/db", asyncHandler(healthController.healthDb));
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/books", booksRoutes);
router.use("/categories", categoriesRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", ordersRoutes);
router.use("/admin", adminRoutes);

router.get("/blogs", schemaNotImplemented);
router.get("/blogs/:id", schemaNotImplemented);
router.post("/blogs", schemaNotImplemented);
router.put("/blogs/:id", schemaNotImplemented);
router.delete("/blogs/:id", schemaNotImplemented);
router.get("/books/:bookId/reviews", schemaNotImplemented);
router.post("/books/:bookId/reviews", schemaNotImplemented);
router.delete("/books/:bookId/reviews/:reviewId", schemaNotImplemented);

export default router;
