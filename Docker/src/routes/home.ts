import express from "express";
import { Request, Response, NextFunction } from "express";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({ message: "Welcome to Docker Tutorial using ts-node" });
  } catch (error) {
    next(error);
  }
});

export default router;
