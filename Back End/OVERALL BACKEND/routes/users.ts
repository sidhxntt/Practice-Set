// routes/userRoutes.ts
import { Router } from "express";
import prisma from "../prisma/prisma";
import getOne from "../utils/getOne";
import { SubRoutes } from "./Sub_Routes";
import getAll from "../utils/getAll";
import post_user from "../utils/post_user";
import patch_user from "../utils/patch_user";
import delete_user from "../utils/delete_user";

const createUserRoutes = (): Router => {
    const userRoutes = new SubRoutes();

    // Get all users
    userRoutes.endpoint(prisma.user, 'get', '/', getAll);

    // Get single user
    userRoutes.endpoint(prisma.user, 'get', '/:id', getOne);

    // Create user
    userRoutes.endpoint(prisma.user, 'post', '/', post_user);

    // Update user
    userRoutes.endpoint(prisma.user, 'patch', '/:id', patch_user);

    // Delete user
    userRoutes.endpoint(prisma.user, 'delete', '/:id', delete_user);

    return userRoutes.getRouter();
};

export default createUserRoutes;