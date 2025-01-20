import { Request, Response } from "express";
import bcrypt from "bcrypt";
import JWT from "../controllers/JWT";
import { PrismaClient } from '@prisma/client';

interface ResponseBody<T> {
  status: string;
  message: string;
  data?: T;
  error?: string;
}

export default class User {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private sendResponse<T>(
    res: Response,
    statusCode: number,
    message: string,
    data?: T,
    error?: string
  ): Response {
    const response: ResponseBody<T> = {
      status: statusCode >= 400 ? "error" : "success",
      message,
      data,
      error,
    };
    return res.status(statusCode).json(response);
  }

  public signupPage = (req: Request, res: Response) => {
    return this.sendResponse(
      res,
      200,
      "Signup to Login. Provide your username & password to signup in json format in request body. "
    );
  }

  public signup = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      const existingUser = await this.prisma.api_users.findUnique({
        where: { username }
      });

      if (existingUser) {
        return this.sendResponse(
          res, 
          400, 
          "Username already exists"
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await this.prisma.api_users.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      return this.sendResponse(
        res,
        201,
        "User created successfully",
        { message: "User created successfully", instruction: "Login to continue" }
      );
    } catch (error) {
      console.error('Signup error:', error);
      return this.sendResponse(
        res,
        500,
        "Error creating user",
        undefined,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  public loginPage = (req: Request, res: Response) => {
    return this.sendResponse(
      res,
      200,
      "Login to Continue. Provide your username & password to login in json format in request body. "
    );
  }

  public login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const existingUser = await this.prisma.api_users.findUnique({
        where: { username }
      });

      if (!existingUser) {
        return this.sendResponse(
          res,
          400,
          "Authentication failed",
          undefined,
          "Incorrect username"
        );
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!passwordMatch) {
        return this.sendResponse(
          res,
          400,
          "Authentication failed",
          undefined,
          "Incorrect password"
        );
      }

      const jwt = new JWT();
      const token = await jwt.createToken(existingUser.id);

      return this.sendResponse(
        res,
        200,
        "Login successful",
        { 
          access_token: token,
          message: "Please copy this Access_Token and paste it in your http auth bearer token."
        }
      );
    } catch (error) {
      console.error('Login error:', error);
      return this.sendResponse(
        res,
        500,
        "Login failed",
        undefined,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
}

