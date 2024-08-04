import express from "express";
const router = express.Router();
import { Request, Response, NextFunction } from 'express';

router.get("/", async (req: Request, res: Response, next: NextFunction) => { 
  try {
    res.status(200).json({message: "Hello to Docker tutorial"})
  } catch (error) {
    next(error);
  }
});


export default router;
