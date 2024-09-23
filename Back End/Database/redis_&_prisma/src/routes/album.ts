import express, { NextFunction, Request, Response } from "express";
import prisma from "../prisma/prisma";
import Getall from "../utils/Get_all";
import getone from "../utils/Get_One";
import decryptJWT from "../controllers/decryption";
import rateLimiter from "../controllers/rate_limitter";

const router = express.Router();

// GET request handler to fetch albums with pagination
router.get("/", rateLimiter, decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
  Getall(prisma.album, req, res, next)
});

// GET request handler to fetch a specific album by ID
router.get("/:albumID", rateLimiter, decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
  getone(prisma.album, 'albumID', req, res, next)
});

export default router;