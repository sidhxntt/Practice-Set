import { Application } from "express";
import products from "./products";
import home from "./home"
import user from "./User"
import orders from "./orders"

const allRoutes = (app: Application) => {
  app.use("/", home);
  app.use("/user", user);
  app.use("/product", products);
  app.use("/orders", orders);
};

export default allRoutes;
