import { Router } from "express";
import { SubRoutes } from "./Sub_Routes";
import client from "../utils/Client";
import User from "../utils/API_User";

const createUserRoutes = (): Router => {
  const APIuserRoutes = new SubRoutes();
  const APIuser = new User(client.Prisma());

  APIuserRoutes.endpoint("get", "/signup", APIuser.signupPage, []);
  APIuserRoutes.endpoint("post", "/signup", APIuser.signup, []);
  APIuserRoutes.endpoint("get", "/login", APIuser.loginPage, []);
  APIuserRoutes.endpoint("post", "/login", APIuser.login, []);

  return APIuserRoutes.getRouter();
};

const users = createUserRoutes();
export default users;