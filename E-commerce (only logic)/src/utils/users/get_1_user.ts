import { Request, Response, NextFunction } from "express";

async function get_1_product(
  req: Request,
  res: Response,
  next: NextFunction,
  model: any
) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await model.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product retrieved successfully", user });
  } catch (error) {
    next(error);
  }
}

export default get_1_product;
