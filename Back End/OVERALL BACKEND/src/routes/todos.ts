import { Router } from "express";
import { SubRoutes } from "./Sub_Routes";
import Data from "../utils/Data";
import JWT from "../controllers/JWT";
import {client} from "../utils/Client";
import limiter from "../controllers/rate_limitter";


const createUserRoutes = (): Router => {
  
  const prisma = client.Prisma();
  const auth = new JWT();
  const todosRoutes = new SubRoutes();
  const todos = new Data(prisma.todos);

  todosRoutes.endpoint("get", "/", todos.getAll.bind(todos), [auth.decryptJWT, limiter]);
  todosRoutes.endpoint("get", "/:id", todos.getOne.bind(todos), [auth.decryptJWT, limiter]);

  return todosRoutes.getRouter();
};

const todos = createUserRoutes();
export default todos;
