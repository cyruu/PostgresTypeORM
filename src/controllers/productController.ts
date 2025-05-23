import { Request, Response } from "express";
import AppDataSource from "../dbconnect/dbconnect";
import { Product } from "../entities/Product";
import { Category } from "../entities/Category";
import { In } from "typeorm";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, categoryIds } = req.body;

  try {
    const productRepo = AppDataSource.getRepository(Product);
    const categoryRepo = AppDataSource.getRepository(Category);

    if (!categoryIds || categoryIds.length === 0) {
      return res.status(400).json({ error: "Category IDs cannot be empty" });
    }
    const categories = await categoryRepo.find({
      where: {
        id: In(categoryIds),
      },
    });

    if (categories.length === 0) {
      return res.status(404).json({ error: "Categories not found" });
    }
    console.log("fetches categories", categories);
    const product = productRepo.create({
      name,
      categories,
    });

    const savedProduct = await productRepo.save(product);

    return res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create product" });
  }
};

export const getProductByCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, categoryIds } = req.body;

  try {
    const productRepo = AppDataSource.getRepository(Product);
    const categoryRepo = AppDataSource.getRepository(Category);

    const categories = await categoryRepo.find({
      where: {
        id: In(categoryIds),
      },
    });

    const product = new Product();
    product.name = name;
    product.categories = categories;

    const savedProduct = await productRepo.save(product);

    return res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create product" });
  }
};
