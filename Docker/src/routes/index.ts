import home from "./home";
import { Application } from "express";

const allRoutes = (app: Application) => {
  app.use("/", home);
};

export default allRoutes;
