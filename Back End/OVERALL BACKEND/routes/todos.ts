import { Router } from "express";
import { SubRoutes } from "./Sub_Routes";
import Data from "../utils/Data";
import JWT from "../controllers/JWT";
import client from "../utils/Client";


const createUserRoutes = (): Router => {
  
  const prisma = client.Prisma();
  const auth = new JWT();
  const todosRoutes = new SubRoutes();
  const todos = new Data(prisma.todos);

  todosRoutes.endpoint("get", "/", todos.getAll.bind(todos), [auth.decryptJWT]);
  todosRoutes.endpoint("get", "/:id", todos.getOne.bind(todos), [auth.decryptJWT]);

  return todosRoutes.getRouter();
};

const todos = createUserRoutes();
export default todos;
