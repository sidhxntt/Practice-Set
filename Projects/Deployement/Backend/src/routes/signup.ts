import express, { Request, Response, NextFunction } from "express";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";

const router = express.Router();
const prisma = new PrismaClient();

interface CreateUserRequestBody {
  username: string;
  email: string;
  confirm_password: string;
}

router.post(
  "/",
  async (
    req: Request<{}, {}, CreateUserRequestBody>, 
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { username, email, confirm_password } = req.body;

      // Check if user with the same email or username exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email },
            { username }
          ]
        }
      });

      if (existingUser) {
        if (existingUser.email === email) {
          return res.status(400).json({ message: "Email already registered" });
        }
        if (existingUser.username === username) {
          return res.status(400).json({ message: "Username already registered" });
        }
      } else {
        const hashedPassword = await bcrypt.hash(confirm_password, 10);
        
        const user: User = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword
          }
        });

        return res.status(201).json({
          message: "User created successfully",
          result: user
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

export default router;