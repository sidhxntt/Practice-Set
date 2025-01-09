import { Request, Response, NextFunction } from "express";

async function get_all_orders(
  req: Request,
  res: Response,
  next: NextFunction,
  model: any
) {
    try {
        const orders = await model.findMany()
    
        if (!orders) {
          return res
            .status(404)
            .json({ message: "Products table is empty" });
        }
    
        res.status(200).json({ message: "Orders retrieved successfully", orders });
      } catch (error) {
        next(error)
      }
}

export default get_all_orders;
