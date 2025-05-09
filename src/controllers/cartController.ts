import { Request, Response } from "express";
import { User } from "../entities/User";
import AppDataSource from "../dbconnect/dbconnect";
import { Cart } from "../entities/Cart";

// add to cart
export const addToCart = async (req: Request, res: Response): Promise<any> => {
  console.log("req bu=doy in add to cart", req.body);

  const { quantity, userId } = req.body;

  const cartRepo = AppDataSource.getRepository(Cart);

  const newCart = new Cart();
  newCart.quantity = quantity;
  newCart.user = userId;

  const savedCart = await cartRepo.save(newCart);

  res.json({ msg: "Added to cart", savedCart });
};

// get  user cart
export const getUserCart = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = parseInt(req.params.userId);

  const cartRepo = AppDataSource.getRepository(Cart);

  const userCart = await cartRepo.find({
    where: { user: { id: userId } },
    relations: ["user"],
  });

  return res.status(200).json({ userCart });
};
