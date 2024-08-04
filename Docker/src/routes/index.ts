
import home from "./homes"
import { Application } from "express";

const allRoutes = (app: Application) => {
  app.use("/", home)

};

export default allRoutes;