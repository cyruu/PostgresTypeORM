import { Router } from "express";
import { createProduct } from "../controllers/productController";

const router = Router();

router.post("/addproduct", createProduct);

export default router;
