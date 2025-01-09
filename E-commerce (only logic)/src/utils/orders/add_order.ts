import { Request, Response, NextFunction } from "express";

async function add_order(
  req: Request,
  res: Response,
  next: NextFunction,
  User: any,
  Product: any,
  Order: any
) {
    try {
        if (!req.user || !req.user.id) {
          return res.status(403).json({ message: "User ID not found in token" });
        }
        const user_id = req.user.id;
        const { product_id } = req.params;
        const { quantity } = req.body;
  
        if (!product_id) {
          return res.status(400).json({ error: "Product ID is required" });
        }
        if (!quantity || quantity <= 0) {
          return res
            .status(400)
            .json({ error: "Quantity must be greater than zero" });
        }
  
        const user = await User.findFirst({
          where: { id: user_id },
        });
  
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
  
        const product = await Product.findFirst({
          where: { id: parseInt(product_id, 10) },
        });
  
        if (!product) {
          return res
            .status(404)
            .json({ error: "Product with the given ID does not exist" });
        }
        const price = product.price;
  
        const orders = await Order.upsert({
          create: {
            userId: user_id,
            productId: parseInt(product_id, 10),
            quantity,
            TotalPrice: quantity * price,
          },
          update: {
            quantity,
            TotalPrice : quantity* price
          },
          where: {
            userId_productId: {
              userId: user_id,
              productId: parseInt(product_id, 10),
            },
          },
        });
  
        return res.status(200).json({
          message: `Order created for User ${user_id} for product ${product_id}`,
          orders,
        });
      } catch (error) {
        next(error);
      }
}

export default add_order;
