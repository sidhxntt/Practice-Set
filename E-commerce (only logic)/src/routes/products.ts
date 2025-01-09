import express, { Request, Response, NextFunction, Router } from "express";
import prisma from "../utils/prisma";
import add_product from "../utils/products/add_product";
import get_all_product from "../utils/products/get_all_products";
import get_1_product from "../utils/products/get_1_product";
import decryptJWT from "../controllers/decryption";
import update_product from "../utils/products/update_product";

const router: Router = express.Router();

router.post("/", decryptJWT,async (req: Request, res: Response, next: NextFunction) => {
  add_product(req, res, next, prisma.product);
});

router.get("/", decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
  get_all_product(req, res, next, prisma.product);
});

router.get("/:id",decryptJWT,  async (req: Request, res: Response, next: NextFunction) => {
  get_1_product(req, res, next, prisma.product);
});

router.patch("/:id",decryptJWT,  async (req: Request, res: Response, next: NextFunction) => {
  update_product(req, res, next, prisma.product);
});


export default router;
