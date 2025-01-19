import { Router } from "express";
import prisma from "../prisma/prisma";
import { SubRoutes } from "./Sub_Routes";
import decryptJWT from "../controllers/decryption";
import Data from "../utils/Data";

const createUserRoutes = (): Router => {
    const userRoutes = new SubRoutes();
    const albums = new Data(prisma.album)

    // Get all users
    userRoutes.endpoint('get', '/', albums.getAll.bind(albums), [decryptJWT]);

    // Get single user
    userRoutes.endpoint('get', '/:id', albums.getOne.bind(albums), [decryptJWT]);

    return userRoutes.getRouter();
};

const users = createUserRoutes()
export default users;