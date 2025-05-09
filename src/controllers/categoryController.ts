import { Request, Response } from "express";
import AppDataSource from "../dbconnect/dbconnect";
import { Category } from "../entities/Category";

// create new category
export const createNewCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name } = req.body;

  try {
    const categoryRepo = AppDataSource.getRepository(Category);

    const category = new Category();
    category.name = name;

    const savedCategory = await categoryRepo.save(category);

    return res.status(201).json({
      message: "Category created successfully",
      category: savedCategory,
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to create category" });
  }
};
