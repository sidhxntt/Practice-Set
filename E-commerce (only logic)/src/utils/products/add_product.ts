import { Request, Response, NextFunction } from "express";
import { Product } from "@prisma/client";

async function add_product(
  req: Request,
  res: Response,
  next: NextFunction,
  model: any
) {
  try {
    const data: Product = req.body;
    const { name, type, price } = data;
    if(!name || !type || !price){
      res.status(400).json({
        error: "Product details are required",
        details: `name, type & price`
      })
    }

    const existingProduct = await model.findUnique({
      where: { name },
    });
    if (existingProduct) {
      res
        .status(400)
        .json({ message: "Product with same name cannot be inserted" });
    }
    const product = await model.create({
      data: {
        name,
        type,
        price,
      },
    });
    console.log("Product Added");
    res.status(200).json({ message: "Product added successfully", product });
  } catch (error) {
    next(error);
  }
}

export default add_product;
