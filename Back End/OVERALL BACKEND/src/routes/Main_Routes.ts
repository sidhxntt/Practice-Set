import { Application, Response, NextFunction } from "express";
import users from "./users";
import Api_user from "./API_user";
import addresses from "./addresses";
import posts from "./posts";
import todos from "./todos";
import albums from "./albums";
import home from "./home";
import images from "./images";
import { Client } from "../utils/Client";
import promClient from "prom-client";

class MainRoutes {
  private app: Application;
  private readonly path: string = "/api/v3";

  constructor(app: Application) {
    this.app = app;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Home route
    this.app.use("/", home);

    // API routes
    this.app.use(`${this.path}`, Api_user);
    this.app.use(`${this.path}/users`, users);
    this.app.use(`${this.path}/posts`, posts);
    this.app.use(`${this.path}/todos`, todos);
    this.app.use(`${this.path}/albums`, albums);
    this.app.use(`${this.path}/addresses`, addresses);
    this.app.use(`${this.path}/images`, images);

    // Metrics route
    this.app.get("/metrics", async (_, res: Response, next: NextFunction) => {
      try {
        const metrics = await Client.getMetrics();
        res.set("Content-Type", promClient.register.contentType);
        res.send(metrics);
      } catch (error) {
        next(error);
      }
    });

    // Catch-all for undefined routes
    this.app.use("*", (_, res: Response) => {
      res.status(404).json({ error: "Route not found" });
    });
  }
}

export default (app: Application): void => {
  new MainRoutes(app);
};
