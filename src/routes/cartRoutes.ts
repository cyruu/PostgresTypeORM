import { Router } from "express";
import { addToCart, getUserCart } from "../controllers/cartController";

const router = Router();

router.post("/addtocart", addToCart);

router.get("/usercarts/:userId", getUserCart);

export default router;
