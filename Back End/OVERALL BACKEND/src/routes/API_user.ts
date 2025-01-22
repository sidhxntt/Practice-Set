import { Router } from "express";
import { SubRoutes } from "./Sub_Routes";
import {client} from "../utils/Client";
import User from "../utils/API_User";
import limiter from "../controllers/rate_limitter";
import JWT from "../controllers/Authentication";
import AUTH from "../controllers/Authorisation";


const createUserRoutes = (): Router => {
  const auth = new JWT();
  const APIuserRoutes = new SubRoutes();
  const APIuser = new User(client.Prisma());

  APIuserRoutes.endpoint("get", "/signup", APIuser.signupPage, [limiter]);
  APIuserRoutes.endpoint("post", "/signup", APIuser.signup, [limiter]);
  APIuserRoutes.endpoint("get", "/login", APIuser.loginPage, [limiter]);
  APIuserRoutes.endpoint("post", "/login", APIuser.login, [limiter]);

  APIuserRoutes.endpoint("get", "/api_users", APIuser.getAll.bind(APIuser), [auth.decryptJWT, AUTH.checkAdmin, limiter]);
  APIuserRoutes.endpoint("get", "/api_users/:id", APIuser.getOne.bind(APIuser), [auth.decryptJWT, AUTH.checkAdmin, limiter]);
  APIuserRoutes.endpoint("delete", "/api_users/:id", APIuser.Delete.bind(APIuser), [auth.decryptJWT, AUTH.checkAdmin, limiter]);

  return APIuserRoutes.getRouter();
};

const users = createUserRoutes();
export default users;