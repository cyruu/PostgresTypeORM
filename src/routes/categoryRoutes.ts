import { Router } from "express";
import { createNewCategory } from "../controllers/categoryController";
import { validateCategory } from "../middlewares/category/categoryValidation";
import { authenticateToken } from "../middlewares/authValidation";

const router = Router();

router.post(
  "/addcategory",
  authenticateToken,
  validateCategory,
  createNewCategory
);

export default router;
