import { Router } from "express";
import prisma from "../prisma/prisma";
import { SubRoutes } from "./Sub_Routes";
import decryptJWT from "../controllers/decryption";
import Data from "../utils/Data";

const createUserRoutes = (): Router => {
    const userRoutes = new SubRoutes();
    const address = new Data(prisma.address)

    // Get all users
    userRoutes.endpoint('get', '/', address.getAll.bind(address), [decryptJWT]);

    // Get single user
    userRoutes.endpoint('get', '/:id', address.getOne.bind(address), [decryptJWT]);

    return userRoutes.getRouter();
};

const users = createUserRoutes()
export default users;