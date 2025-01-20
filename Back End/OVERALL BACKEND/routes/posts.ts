import { Router } from "express";
import { SubRoutes } from "./Sub_Routes";
import Data from "../utils/Data";
import JWT from "../controllers/JWT";
import client from "../utils/Client";
import limiter from "../controllers/rate_limitter";

const createUserRoutes = (): Router => {

    const prisma = client.Prisma();
    const auth = new JWT();
    const postRoutes = new SubRoutes();
    const posts = new Data(prisma.post)

    postRoutes.endpoint('get', '/', posts.getAll.bind(posts), [auth.decryptJWT, limiter]);
    postRoutes.endpoint('get', '/:id', posts.getOne.bind(posts), [auth.decryptJWT, limiter]);

    return postRoutes.getRouter();
};

const post = createUserRoutes()
export default post;