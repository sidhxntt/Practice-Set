// routes/index.ts
import { Application, Router } from "express";
import home from "./home";
import users from "./users";
import Api_signup from "./API_signup";
import Api_login from "./API_login";
import addresses from "./addresses";
import posts from "./posts";
import todos from "./todos";
import albums from "./albums";
import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

class MainRoutes {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.app.use("/", home);
    this.app.use("/api/signup", Api_signup);
    this.app.use("/api/login", Api_login);
    this.app.use("/api/users", users);
    this.app.use("/api/posts", posts);
    this.app.use("/api/todos", todos);
    this.app.use("/api/albums", albums);
    this.app.use("/api/addresses", addresses);
  }
}

export default (app: Application): void => {
  new MainRoutes(app);
};

class SubRoutes {
  private readonly prisma: PrismaClient;
  private readonly router: Router;

  constructor() {
    this.prisma = new PrismaClient(); 
    this.router = express.Router()
  }

}