import { Request, Response } from "express";
import { User } from "../entities/User";
import AppDataSource from "../dbconnect/dbconnect";
import { Cart } from "../entities/Cart";

// add to cart
export const addToCart = async (req: Request, res: Response): Promise<any> => {
  console.log("req bu=doy in add to cart", req.body);

  const { quantity, userId, productId } = req.body;

  const cartRepo = AppDataSource.getRepository(Cart);

  const newCart = new Cart();
  newCart.quantity = quantity;
  newCart.user = userId;
  newCart.product = productId;

  const savedCart = await cartRepo.save(newCart);

  res.json({ msg: "Added to cart", savedCart });
};

// get  user cart
export const getUserCart = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId } = req.params;

    const cartRepo = AppDataSource.getRepository(Cart);
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { id: Number(userId) } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const carts = await cartRepo.find({
      where: { user: { id: Number(userId) } },
      relations: ["product"],
    });

    if (!carts || carts.length === 0) {
      return res.status(404).json({ msg: "No items in cart" });
    }

    res.json({ msg: "cart fetched successfully", carts });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
