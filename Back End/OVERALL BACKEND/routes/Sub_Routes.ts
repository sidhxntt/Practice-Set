import { Router, Request, Response, NextFunction } from "express";

type HttpMethod = 'get' | 'post' | 'patch' | 'delete';

export class SubRoutes {
    private router: Router;
    
    constructor() {
        this.router = Router();
    }

    public endpoint(
        method: HttpMethod,
        path: string,
        handler: any,
        middleware: Array<any>
    ): void {
        this.router[method](
            path,
            ...middleware,
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    await handler(req, res);
                } catch (error ) {
                    next(error);
                }
            }
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}

