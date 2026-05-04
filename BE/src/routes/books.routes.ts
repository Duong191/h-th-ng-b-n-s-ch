/** File này khai báo route public cho danh sách và chi tiết sách. */
import { Router } from "express";
import * as controller from "../controllers/book.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();
router.get("/", asyncHandler(controller.listBooks));
router.get("/:id", asyncHandler(controller.getBookById));

export default router;
