import { Router } from "express";
import { SubRoutes } from "./Sub_Routes";
import Data from "../utils/Data";
import Client from "../utils/Client";
import JWT from "../controllers/JWT";

const createUserRoutes = (): Router => {
  const client = new Client()
  const prisma = client.Prisma()
  const auth = new JWT()
  const userRoutes = new SubRoutes();
  const user = new Data(prisma.user);

  userRoutes.endpoint("get", "/", user.getAll.bind(user), [auth.decryptJWT]);
  userRoutes.endpoint("get", "/:id", user.getOne.bind(user), [auth.decryptJWT]);
  userRoutes.endpoint("post", "/", user.Create.bind(user), [auth.decryptJWT]);
  userRoutes.endpoint("patch", "/:id", user.Update.bind(user), [auth.decryptJWT]);
  userRoutes.endpoint("delete", "/:id", user.Delete.bind(user), [auth.decryptJWT]);

  return userRoutes.getRouter();
};

const users = createUserRoutes();
export default users;
