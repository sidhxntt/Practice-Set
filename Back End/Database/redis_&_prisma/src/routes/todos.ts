import express, { NextFunction, Request, Response } from "express";
import prisma from "../prisma/prisma"; 
import Getall from "../utils/Get_all";
import getone from "../utils/Get_One";
import decryptJWT from "../controllers/decryption";
import rateLimiter from "../controllers/rate_limitter";

const router = express.Router();

// GET request handler to fetch todos with pagination
router.get("/", rateLimiter, decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
  Getall(prisma.todos, req, res, next)
});

// GET request handler to fetch a todo by ID
router.get("/:todosID", rateLimiter, decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
  getone(prisma.todos, 'todosID', req, res, next)
});

export default router;