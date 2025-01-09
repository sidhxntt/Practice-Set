import { Request, Response, NextFunction } from "express";

async function get_1_user(
  req: Request,
  res: Response,
  next: NextFunction,
  model: any
) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await model.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product retrieved successfully", product });
  } catch (error) {
    next(error);
  }
}

export default get_1_user;
