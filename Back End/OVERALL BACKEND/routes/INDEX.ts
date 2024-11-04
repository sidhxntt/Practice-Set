import home from "./home"
import users from "./users"
import posts from "./posts"
import Api_signup from "./API_signup"
import Api_login from "./API_login"
import { Application } from "express";

const allRoutes = (app: Application) => {
  app.use("/", home);
  app.use("/api/signup", Api_signup);
  app.use("/api/login", Api_login);
  app.use("/api/users", users);
  app.use("/api/posts", posts);

};

export default allRoutes;
