import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { Request, Response, NextFunction } from "express";
import { User } from "../../entities/User";
import AppDataSource from "../../dbconnect/dbconnect";
import { Category } from "../../entities/Category";

// validate category fields
export const validateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const categoryInstance = plainToInstance(Category, req.body);
  const errors = await validate(categoryInstance);

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
