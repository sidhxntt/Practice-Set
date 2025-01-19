import { Router } from "express";
import prisma from "../prisma/prisma";
import { SubRoutes } from "./Sub_Routes";
import decryptJWT from "../controllers/decryption";
import Data from "../utils/Data";

const createUserRoutes = (): Router => {
    const userRoutes = new SubRoutes();
    const posts = new Data(prisma.post)

    // Get all users
    userRoutes.endpoint('get', '/', posts.getAll.bind(posts), [decryptJWT]);

    // Get single user
    userRoutes.endpoint('get', '/:id', posts.getOne.bind(posts), [decryptJWT]);

    return userRoutes.getRouter();
};

const users = createUserRoutes()
export default users;