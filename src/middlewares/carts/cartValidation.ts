import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { Request, Response, NextFunction } from "express";
import { Product } from "../../entities/Product";
import { CreateProductDto } from "../../validateDTO/CreateProductDto";
import { addToCartDto } from "../../validateDTO/AddToCartDto";

// validate category id when creating products
export const validateProductIdForCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const addToCartDtoResponse = plainToInstance(addToCartDto, req.body);
  const errors = await validate(addToCartDtoResponse);

  if (errors.length > 0) {
    // Only get the first error message
    const firstErrorMessage = Object.values(errors[0].constraints || {})[0];
    return res.status(400).json({
      message: firstErrorMessage,
      statusCode: 400,
    });
  }

  next();
};
