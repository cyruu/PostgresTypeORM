import { Router } from "express";
import { addToCart, getUserCart } from "../controllers/cartController";
import { authenticateToken } from "../middlewares/authValidation";
import { validateProductIdForCart } from "../middlewares/carts/cartValidation";

const router = Router();

router.post(
  "/addtocart",
  authenticateToken,
  validateProductIdForCart,
  addToCart
);

router.get("/usercarts/:userId", authenticateToken, getUserCart);

export default router;
