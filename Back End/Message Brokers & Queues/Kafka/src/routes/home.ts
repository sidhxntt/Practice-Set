import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .status(200)
      .json({ message: "Welcome to Monitoring tutorial",
      });
  } catch (error) {
    next(error);
  }
});

export default router;