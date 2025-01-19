import { Router } from "express";
import { SubRoutes } from "./Sub_Routes";
import Data from "../utils/Data";
import JWT from "../controllers/JWT";
import Client from "../utils/Client";

const createUserRoutes = (): Router => {
      const client = new Client();
      const prisma = client.Prisma();
      const auth = new JWT();
    const albumRoutes = new SubRoutes();
    const albums = new Data(prisma.album)

    albumRoutes.endpoint('get', '/', albums.getAll.bind(albums), [auth.decryptJWT]);
    albumRoutes.endpoint('get', '/:id', albums.getOne.bind(albums), [auth.decryptJWT]);
    
    return albumRoutes.getRouter();
};

const users = createUserRoutes()
export default users;