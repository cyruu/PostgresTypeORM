import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import AppDataSource from "../dbconnect/dbconnect";
import { User } from "../entities/User";

export const loginController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, password = "anypassword" } = req.body;

  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // hardcode password valid
  const isPasswordValid = true;

  // Prepare payload for the JWT token
  const payload = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: "admin",
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: "2m",
  });

  return res.status(200).json({
    message: "Login successful",
    token,
  });
};
