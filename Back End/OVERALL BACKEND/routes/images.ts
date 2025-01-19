import { Router } from "express";
import prisma from "../prisma/prisma";
import { SubRoutes } from "./Sub_Routes";
import decryptJWT from "../controllers/decryption";
import Data from "../utils/Data";

const createUserRoutes = (): Router => {
    const userRoutes = new SubRoutes();
    const images = new Data(prisma.image)

    // Get all users
    userRoutes.endpoint('get', '/', images.getAll.bind(images), [decryptJWT]);

    // Get single user
    userRoutes.endpoint('get', '/:id', images.getOne.bind(images), [decryptJWT]);

    return userRoutes.getRouter();
};

const users = createUserRoutes()
export default users;