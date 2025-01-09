import express, { Request, Response, NextFunction } from "express";
import { signup_message, signup } from "../utils/users/signup";
import prisma from "../utils/prisma";
import { login_message, login } from "../utils/users/login";
import get_all_user from "../utils/users/get_users";
import get_1_user from "../utils/products/get_1_product";
import decryptJWT from "../controllers/decryption";
import update_user from "../utils/users/update_user";

const router = express.Router();

router.get("/signup", async (req: Request, res: Response, next: NextFunction) => {
  signup_message(req, res, next);
});

router.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
  signup(req, res, next, prisma.user);
});

router.get("/login", async (req: Request, res: Response, next: NextFunction) => {
  login_message(req, res, next);
});

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  login(req, res, next, prisma.user);
});

router.get("/", decryptJWT ,async (req: Request, res: Response, next: NextFunction) => {
  get_all_user(req, res, next, prisma.user);
});

router.post("/:id", decryptJWT ,async (req: Request, res: Response, next: NextFunction) => {
  get_1_user(req, res, next, prisma.user);
});

router.patch("/:id", decryptJWT ,async (req: Request, res: Response, next: NextFunction) => {
  update_user(req, res, next, prisma.user);
});

export default router;
