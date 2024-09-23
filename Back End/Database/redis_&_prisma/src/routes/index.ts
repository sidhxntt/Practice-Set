import home from './home'
import signup from './API_signup'
import login from './API_login' 
import users from "./users"
import address from "./address"
import posts from "./posts"
import todos from "./todos"
import albums from "./album"
import images from "./images"
import { Application } from "express";

const allRoutes = (app: Application) => {
  app.use('/', home);
  app.use('/signup', signup);
  app.use('/login', login);
  app.use("/users", users);
  app.use("/addresses", address);
  app.use("/posts", posts);
  app.use("/todos", todos);
  app.use("/albums", albums);
  app.use("/images", images);
};

export default allRoutes;
