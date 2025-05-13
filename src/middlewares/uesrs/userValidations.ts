import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { Request, Response, NextFunction } from "express";
import { User } from "../../entities/User";
import AppDataSource from "../../dbconnect/dbconnect";

// validate user fields
export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const userInstance = plainToInstance(User, req.body);
  const errors = await validate(userInstance);

  if (errors.length > 0) {
    // Only get the first error message (any first message regardless the key of the validation error)
    const firstErrorMessage = Object.values(errors[0].constraints || {})[0];
    return res.status(400).json({
      message: firstErrorMessage,
      statusCode: 400, // 400 for validation error
    });
  }

  next();
};

// validate if passed userid has record in db
export const validatePassedUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { userid } = req.params;

  const userRepo = AppDataSource.getRepository(User);

  // Check if the user exists
  const foundUser = await userRepo.findOne({
    where: { id: Number(userid) },
  });

  // user not found
  if (!foundUser) {
    return res.status(404).json({ message: "User not found", stausCode: 404 });
  }

  next();
};
