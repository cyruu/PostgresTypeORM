import { Router } from "express";
import {
  createProduct,
  getProductByCategory,
} from "../controllers/productController";
import {
  validateProduct,
  validateProductCategoryArray,
} from "../middlewares/products/productValidations";

const router = Router();

router.post(
  "/addproduct",
  validateProductCategoryArray,
  validateProduct,
  createProduct
);

router.post("/getproductbycategory/catId", getProductByCategory);

export default router;
