import signup from "./signup";
import login from "./login";

import { Application } from "express";

const allRoutes = (app: Application) => {
  app.use("/api/signup", signup);
  app.use("/api/login", login);
};

export default allRoutes;
