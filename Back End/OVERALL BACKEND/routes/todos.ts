import { Router } from "express";
import prisma from "../prisma/prisma";
import { SubRoutes } from "./Sub_Routes";
import decryptJWT from "../controllers/decryption";
import Data from "../utils/Data";

const createUserRoutes = (): Router => {
    const userRoutes = new SubRoutes();
    const todos = new Data(prisma.todos)

    // Get all users
    userRoutes.endpoint('get', '/', todos.getAll.bind(todos), [decryptJWT]);

    // Get single user
    userRoutes.endpoint('get', '/:id', todos.getOne.bind(todos), [decryptJWT]);

    return userRoutes.getRouter();
};

const users = createUserRoutes()
export default users;