import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import createToken from "../controllers/JWT";

const router = express.Router();
const prisma = new PrismaClient();

interface CreateUserRequestBody {
  username: string;
  password: string;
}

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      message: "Login to Continue.",
      instruction:
        "Provide your username & password to login in json format in request body.",
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  async (
    req: Request<{}, {}, CreateUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { username, password } = req.body;

      const existing_user = await prisma.api_users.findUnique({
        where: { username },
      });

      if (!existing_user) {
        return res.status(400).json({ message: "Incorrect Username" });
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existing_user.password
      );

      if (!passwordMatch) {
        return res.status(400).json({ message: "Incorrect Password" });
      }
      const token = await createToken(existing_user.id);
      return res.status(200).json({
        message: "Login successful",
        Acess_Token: token,
        instruction:
          "Please copy this Acess_Token and paste it your http auth bearer token.",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
