import { Router } from "express";
import * as controller from "../controllers/book.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();
router.get("/", asyncHandler(controller.listBooks));
router.get("/:id", asyncHandler(controller.getBookById));

export default router;
