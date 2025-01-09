import { Request, Response, NextFunction } from "express";

async function get_all_product(
  req: Request,
  res: Response,
  next: NextFunction,
  model: any
) {
  try {
    const products = await model.findMany()

    if (!products) {
      return res
        .status(404)
        .json({ message: "Products table is empty" });
    }

    res.status(200).json({ message: "Product retrieved successfully", products });
  } catch (error) {
    next(error);
  }
}

export default get_all_product;
