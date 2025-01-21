import { Router } from "express";
import { SubRoutes } from "./Sub_Routes";
import Data from "../utils/Data";
import JWT from "../controllers/JWT";
import {client} from "../utils/Client";
import limiter from "../controllers/rate_limitter";

const createUserRoutes = (): Router => {

    const prisma = client.Prisma();
    const auth = new JWT();
    const imagesRoutes = new SubRoutes();
    const images = new Data(prisma.image)

    imagesRoutes.endpoint('get', '/', images.getAll.bind(images), [auth.decryptJWT, limiter]);
    imagesRoutes.endpoint('get', '/:id', images.getOne.bind(images), [auth.decryptJWT, limiter]);

    return imagesRoutes.getRouter();
};

const images = createUserRoutes()
export default images;