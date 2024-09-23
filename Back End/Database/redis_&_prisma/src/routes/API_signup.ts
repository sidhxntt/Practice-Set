import express, { Request, Response, NextFunction } from "express";
import { PrismaClient, Api_users } from "@prisma/client";
import bcrypt from "bcrypt";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .status(200)
      .json({ 
        message: "Signup to Login.",
        instruction: "Provide your username & password to signup in json format in request body."
      });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body as Api_users;
      // Check if user with the same email or username exists
      const existingUser = await prisma.api_users.findUnique({
        where: { username },
      });
      if (existingUser) {
        if (existingUser.username === username) {
          return res.status(400).json({ message: "Username already exists" });
        }
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.api_users.create({
          data: {
            username,
            password: hashedPassword
          }
        });
        console.log('API User created successfully')
        res.status(201).json({ message: "User created successfully. Login to continue" });
      }
    } catch (error) {
      next(error);
    }
  });

  export default router;