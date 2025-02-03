import { Request, Response } from "express";
import bcrypt from "bcrypt";
import JWT from "../controllers/Authentication";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import Data from "./Data";
import { emailQueue, smsQueue, Client } from "./Client";

dotenv.config();

export default class User extends Data {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    super(prisma.api_users);
    this.prisma = prisma;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public signupPage = (req: Request, res: Response): Response => {
    Client.logger!.info("Signup page accessed");
    return this.sendResponse(
      res,
      200,
      "Signup to Login. Provide your username & password to signup in json format in request body."
    );
  };

  public signup = async (req: Request, res: Response): Promise<Response> => {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return this.sendResponse(
        res,
        400,
        "Email and password are required",
        undefined,
        "Missing required fields"
      );
    }

    const validEmail = this.isValidEmail(email);
    if (!validEmail) {
      return this.sendResponse(
        res,
        400,
        "Invalid email format",
        undefined,
        "Invalid email"
      );
    }

    const existingUser = await this.prisma.api_users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return this.sendResponse(
        res,
        400,
        "Username already exists",
        undefined,
        "Duplicate email"
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.api_users.create({
      data: {
        email,
        password: hashedPassword,
        role: role || "user",
      },
    });

    const emailJob= await emailQueue.Queue().add("send-email", {
      email: process.env.EMAIL,
      message: "New User added to API",
    });
    Client.logger!.info(`Added job to email queue. Email Job ID: ${emailJob.id}}`);

    const smsJob = await smsQueue.Queue().add("send-sms", {
      to: process.env.PHONE_NUMBER,
      message: "New User added to API",
    });
    Client.logger!.info(`Added job to email queue. SMS Job ID: ${smsJob.id}}`);


    Client.logger!.info("New Api user created");
    return this.sendResponse(res, 201, "User created successfully", {
      id: newUser.id,
      email: newUser.email,
      message: "User created successfully",
      instruction: "Login to continue",
    });
  };

  public loginPage = (req: Request, res: Response): Response => {
    Client.logger!.info("Login Page Accessed");
    return this.sendResponse(
      res,
      200,
      "Login to Continue. Provide your username & password to login in json format in request body."
    );
  };

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    if (!email || !password) {
      return this.sendResponse(
        res,
        400,
        "Authentication failed",
        undefined,
        "Email and password are required"
      );
    }

    const existingUser = await this.prisma.api_users.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return this.sendResponse(
        res,
        400,
        "Authentication failed",
        undefined,
        "Incorrect email"
      );
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

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
    const token = await jwt.createToken(existingUser.id, existingUser.role);

    Client.logger!.info("Api user logged in");
    return this.sendResponse(res, 200, "Login successful", {
      access_token: token,
      message:
        "Please copy this Access_Token and paste it in your http auth bearer token.",
    });
  };

}
