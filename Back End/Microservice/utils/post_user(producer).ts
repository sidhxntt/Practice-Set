import { Request, Response, NextFunction } from "express";
import {kafka_client} from "./kafka_client";


interface UserInput {
  email: string;
}

async function post_user(req: Request, res: Response, next: NextFunction, model: any) {
  try {
    const { email } = req.body as UserInput;

    // Validate input
    if (!email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if a user with the same email already exists
    const existingUser = await model.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create user in the database (using Prisma)
    const user = await model.create({
      data: {
        email,
      },
    });

    // Respond with success
    return res.status(201).json({
      message: "Email registered successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  } 
}

export default post_user;
