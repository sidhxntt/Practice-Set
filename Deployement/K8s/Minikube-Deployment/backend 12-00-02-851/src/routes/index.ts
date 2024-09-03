import signup from "./signup";
import login from "./login";
import home from "./home";

import { Application } from "express";

const allRoutes = (app: Application) => {
  app.use("/", home)
  app.use("/api/signup", signup);
  app.use("/api/login", login);
};

export default allRoutes;
