import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .status(200)
      .json({ 
        message: "Welcome User to Ecommerce Backend",
        motive: "Only backend logic for any basic ecommerce site"
      });
  } catch (error) {
    next(error);
  }
});

export default router;
