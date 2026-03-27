import { Router } from "express";
import * as controller from "../controllers/category.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();
router.get("/", asyncHandler(controller.listCategories));
router.get("/detailed", asyncHandler(controller.listCategoriesDetailed));

export default router;
