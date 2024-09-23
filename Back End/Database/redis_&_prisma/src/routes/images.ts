import express, { NextFunction, Request, Response } from "express";
import prisma from "../prisma/prisma"; 
import Getall from "../utils/Get_all";
import getone from "../utils/Get_One";
import decryptJWT from "../controllers/decryption";
import rateLimiter from "../controllers/rate_limitter";

const router = express.Router();

//  GET Route for Fetching Images with Pagination:
router.get("/", rateLimiter, decryptJWT, async(req: Request, res: Response, next: NextFunction) => {
    return Getall(prisma.image, req, res, next);
  });
  
//  GET Route for Fetching a Specific Image by ID:
router.get("/:imageID", rateLimiter, decryptJWT, async(req: Request, res: Response, next: NextFunction) => {
    return getone(prisma.image, 'imageID', req, res, next);
});

export default router;
