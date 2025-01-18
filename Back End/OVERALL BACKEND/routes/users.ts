import express, { Request, Response, NextFunction } from "express";
import decryptJWT from "../controllers/decryption";
import prisma from "../prisma/prisma"
import getAll from "../utils/getAll";
import getone from "../utils/getone";
import post_user from "../utils/post_user";
import delete_user from "../utils/delete_user";
import patch_user from "../utils/patch_user";

const router = express.Router();

// Get all users
router.get("/", async(req: Request, res: Response, next: NextFunction)=>{
 getAll(req, res, next, prisma.user)
}) 

// post user
router.post("/", decryptJWT, async(req: Request, res:Response, next: NextFunction)=>{
  post_user(req, res, next, prisma.user)
})

// get one user
router.get("/:userID", decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
  const userID: string = req.params.userID;
  await getone(req, res, next, prisma.user, userID);
});


// delete one user
router.delete("/:userID", decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
  const userID: string = req.params.userID;
  delete_user(req, res, next, prisma.user, prisma.address, userID)
});

// update one user
router.patch("/:userID", decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
  const userID: string = req.params.userID;
  patch_user(req, res, next, prisma.user, userID)
});

export default router