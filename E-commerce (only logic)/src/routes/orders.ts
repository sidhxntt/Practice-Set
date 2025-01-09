import express, { Request, Response, NextFunction } from "express";
import prisma from "../utils/prisma";
import decryptJWT from "../controllers/decryption";
import add_order from "../utils/orders/add_order";
import get_all_orders from "../utils/orders/get_all_orders";

const router = express.Router();

router.post(
  "/:product_id",
  decryptJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    add_order(req, res, next, prisma.user, prisma.product, prisma.orders);
  }
);

router.get(
  "/",
  decryptJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    get_all_orders(req, res, next, prisma.orders);
  }
);

router.get(
  "/summary",
  decryptJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(403).json({ message: "User ID not found in token" });
      }
      const user_id = req.user.id;

      const total_orders_of_user = await prisma.orders.findMany({
        where: { userId: user_id },
        include: {
          user: true, 
          product: true 
        },
      });

      if (total_orders_of_user.length === 0) {
        return res.status(400).json({ error: `No Orders for User ${user_id}` });
      }

      const total_price = total_orders_of_user.reduce((acc, order) => acc + order.TotalPrice, 0);

      const items = total_orders_of_user.map(order => {
        const productName = order.product.name;
        const quantity = order.quantity;
        const productCost = order.product.price;
        const subTotal = order.TotalPrice;
        return { productName, quantity, productCost, subTotal };
      });

      res.json({
        name: total_orders_of_user[0].user.name, 
        email: total_orders_of_user[0].user.email,
        phone_number: total_orders_of_user[0].user.phone_number,
        cart: items,
        GrandTotal: total_price,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
