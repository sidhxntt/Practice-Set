import { Router } from "express";
import { SubRoutes } from "./Sub_Routes";
import Data from "../utils/Data";
import JWT from "../controllers/JWT";
import {client} from "../utils/Client";
import limiter from "../controllers/rate_limitter";


const createUserRoutes = (): Router => {
    const prisma = client.Prisma();
    const auth = new JWT();
    const albumRoutes = new SubRoutes();
    const albums = new Data(prisma.album)

    albumRoutes.endpoint('get', '/', albums.getAll.bind(albums), [auth.decryptJWT, limiter]);
    albumRoutes.endpoint('get', '/:id', albums.getOne.bind(albums), [auth.decryptJWT, limiter]);
    
    return albumRoutes.getRouter();
};

const users = createUserRoutes()
export default users;