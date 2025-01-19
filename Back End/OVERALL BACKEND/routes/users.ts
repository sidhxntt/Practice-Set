import { Router } from "express";
import prisma from "../prisma/prisma";
import { SubRoutes } from "./Sub_Routes";
import decryptJWT from "../controllers/decryption";
import Data from "../utils/Data";

const createUserRoutes = (): Router => {
    const userRoutes = new SubRoutes();
    const user = new Data(prisma.user)

    // Get all users
    userRoutes.endpoint('get', '/', user.getAll.bind(user), [decryptJWT]);

    // Get single user
    userRoutes.endpoint('get', '/:id', user.getOne.bind(user), [decryptJWT]);

    // Create user
    userRoutes.endpoint('post', '/', user.Create.bind(user), [decryptJWT]);

    // Update user
    userRoutes.endpoint('patch', '/:id', user.Update.bind(user), [decryptJWT]);

    // Delete user
    userRoutes.endpoint('delete', '/:id', user.Delete.bind(user), [decryptJWT]);

    return userRoutes.getRouter();
};

const users = createUserRoutes()
export default users;