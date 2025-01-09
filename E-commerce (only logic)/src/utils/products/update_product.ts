import { Request, Response, NextFunction } from "express";
import { Product } from "@prisma/client";

async function update_product(
  req: Request,
  res: Response,
  next: NextFunction,
  model: any
) {
  try {
    const data: Product = req.body;
    const { id } = req.params;
    const { name, type, price } = data;

    if(!id ){
      res.status(400).json({
        error: "Product ID is required",
      })
    }

    const existingProduct = await model.findUnique({
    where: { id: parseInt(id, 10) },
    });
    if (!existingProduct) {
      res
        .status(400)
        .json({ message: "Product not found" });
    }
    const updated_product = await model.update({
        where: { id: parseInt(id, 10) },
        data:{
            type,
            price
        }
    })
    console.log("Product Updated");
    res.status(200).json({ message: "Product added successfully", updated_product });
  } catch (error) {
    next(error);
  }
}

export default update_product;
