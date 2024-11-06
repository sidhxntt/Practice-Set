import express, { Request, Response, NextFunction } from "express";
import decryptJWT from "../controllers/decryption";
import prisma from "../prisma/prisma"
import getAll from "../utils/getAll";
import getone from "../utils/getone";

const router = express.Router();

// Get all users
router.get("/", decryptJWT, async(req: Request, res: Response, next: NextFunction)=>{
 getAll(req, res, next, prisma.todos)
}) 

// get one user
router.get("/:userID", decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
  const userID: string = req.params.userID;
  getone(req, res, next, prisma.todos, userID)
});


export default router