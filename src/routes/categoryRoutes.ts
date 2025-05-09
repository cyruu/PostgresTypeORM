import { Router } from "express";
import { createNewCategory } from "../controllers/categoryController";

const router = Router();

router.post("/addcategory", createNewCategory);

export default router;
