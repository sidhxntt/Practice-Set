import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import createToken from "../../controllers/JWT";

async function login_message(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({
      message: "Login to Continue.",
      instruction:
        "Provide your username & password to login in json format in request body.",
    });
  } catch (error) {
    next(error);
  }
}

async function login(
  req: Request,
  res: Response,
  next: NextFunction,
  model: any
) {
  try {
    const data: User = req.body;
    const { email, password } = data;
    if(!email || !password){
      res.status(400).json({error: "email & password are required"})
    }

    const existing_user = await model.findUnique({
      where: { email },
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
        "Please copy this Acess_Token and  paste it your http auth bearer token.",
    });
  } catch (error) {
    next(error);
  }
}

export { login_message, login };
