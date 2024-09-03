import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import decryptJWT from "../controllers/decryption";

const router = express.Router();
const prisma = new PrismaClient();

router.get( "/", decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await prisma.posts.findMany({
            include: {
                user: true,
                tags: true,
            }
        });
        res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id", decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const post = await prisma.posts.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          user: true,
          tags: true,
        },
      });
  
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      next(error);
    }
  });
  

export default router;