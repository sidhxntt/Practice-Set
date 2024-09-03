import home from "./home"
import users from "./users"
import posts from "./posts"
import { Application } from "express";

const allRoutes = (app: Application) => {
  app.use("/api", home);
  app.use("/api/users", users);
  app.use("/api/posts", posts);

};

export default allRoutes;
