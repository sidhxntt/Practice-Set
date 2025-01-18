// routes/SubRoutes.ts
import { Router, Request, Response, NextFunction } from "express";
import decryptJWT from "../controllers/decryption";

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
type RouteHandler = Promise<Response<any, Record<string, any>> | undefined>

export class SubRoutes {
    private router: Router;
    
    constructor() {
        this.router = Router();
    }

    public endpoint<T>(
        model: T,
        method: HttpMethod,
        path: string,
        handler: any,
        middleware: Array<any> = [decryptJWT]
    ): void {
        this.router[method](
            path,
            ...middleware,
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    await handler(req, res, next, model);
                } catch (error) {
                    next(error);
                }
            }
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}

