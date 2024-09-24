import express, { Request, Response, NextFunction } from "express";
import heavyTask from "../utils/heavy_task";
import { logger } from "../utils/loki";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  logger.info("Request came on /slow route HEAVY TASK");
  try {
    const time_taken = await heavyTask();
    res
      .status(200)
      .json({ message: `Heavy task completed in ${time_taken} ms` });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }
    next(error);  
  }
});

export default router;