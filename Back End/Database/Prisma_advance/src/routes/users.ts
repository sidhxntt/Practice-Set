import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import decryptJWT from "../controllers/decryption";

const router = express.Router();
const prisma = new PrismaClient();

router.get( "/", decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                profile: true,
                posts: true,
            }
        });
        res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id", decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        profile: true,
        posts: true,
      },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email, username} = req.body;
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
      include: {
        profile: true,
        posts: true,
      },
    });

    if (user) {
      res.status(200).json({
        message: "User found",
        user,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});


export default router;