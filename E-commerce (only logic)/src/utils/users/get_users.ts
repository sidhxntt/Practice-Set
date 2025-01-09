import { Request, Response, NextFunction } from "express";

async function get_all_user(
  req: Request,
  res: Response,
  next: NextFunction,
  model: any
) {
  try {
    const users = await model.findMany()

    if (!users) {
      return res
        .status(404)
        .json({ message: "Products table is empty" });
    }

    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
    next(error);
  }
}

export default get_all_user;
