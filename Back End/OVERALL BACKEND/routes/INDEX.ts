import home from "./home"
import users from "./users"
import Api_signup from "./API_signup"
import Api_login from "./API_login"
import { Application } from "express";
import addresses from "./addresses"
import posts from "./posts"
import todos from './todos'
import albums from "./albums"

const allRoutes = (app: Application) => {
  app.use("/", home);
  app.use("/api/signup", Api_signup);
  app.use("/api/login", Api_login);
  app.use("/api/users", users);
  app.use("/api/posts", posts);
  app.use("/api/todos", todos);
  app.use("/api/albums", albums);
  app.use("/api/addresses", addresses);

};

export default allRoutes;
