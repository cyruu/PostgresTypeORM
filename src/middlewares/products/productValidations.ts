import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { Request, Response, NextFunction } from "express";
import { Product } from "../../entities/Product";
import { CreateProductDto } from "../../validateDTO/CreateProductDto";

// validate user fields
export const validateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const productInstance = plainToInstance(Product, req.body);
  const errors = await validate(productInstance);

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

// validate category id when creating products
export const validateProductCategoryArray = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const createProductDtoResponse = plainToInstance(CreateProductDto, req.body);
  const errors = await validate(createProductDtoResponse);

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
