import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import createToken from "../controllers/jwt";

const router = express.Router();
const prisma = new PrismaClient();

interface CreateUserRequestBody {
  email: string;
  password: string;
}

router.post(
  "/",
  async (
    req: Request<{}, {}, CreateUserRequestBody>, 
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;

      const existing_user = await prisma.user.findUnique({
        where: { email },
      });

      if (!existing_user) {
        return res.status(400).json({ message: "Incorrect Email" });
      }

      const passwordMatch = await bcrypt.compare(password, existing_user.password);

      if (!passwordMatch) {
        return res.status(400).json({ message: "Incorrect Password" });
      }
      const token =  await createToken(existing_user.id)
      return res.status(200).json({ message: "Login successful"});

    } catch (error) {
      next(error);
    }
  }
);

export default router;