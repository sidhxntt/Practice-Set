import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get( "/",async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({message: "LETS START"})
    } catch (error) {
      next(error);
    }
  }
);

export default router;