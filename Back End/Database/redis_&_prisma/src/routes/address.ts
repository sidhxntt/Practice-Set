import express, { Request, Response, NextFunction } from "express";
import prisma from "../prisma/prisma"; 
import Getall from "../utils/Get_all";
import getone from "../utils/Get_One";
import decryptJWT from "../controllers/decryption";
import rateLimiter from "../controllers/rate_limitter";

const router = express.Router();

// GET request handler to fetch addresses with pagination
router.get("/", rateLimiter, decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
 Getall(prisma.address, req, res, next)
});

// GET request handler to fetch an address by ID
router.get("/:addressID", rateLimiter, decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
  getone(prisma.address, 'addressID', req, res, next)

});

export default router;