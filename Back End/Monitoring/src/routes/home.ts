import express, { Request, Response, NextFunction } from "express";
import { logger } from "../utils/loki";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Home request")
    res
      .status(200)
      .json({ message: "Welcome to Monitoring tutorial",
      });
  } catch (error) {
    logger.error("Error in Home request")
    next(error);
  }
});

export default router;
