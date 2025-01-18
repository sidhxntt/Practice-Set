import express, { Application } from "express";
import allRoutes from "./routes";
import "dotenv/config";
import error_handling from "./controllers/error";
import database from "./db";
import redis from "./utils/redis_client";

class Server {
    private readonly app: Application;
    private readonly port: string | undefined;
    private readonly serverUrl: string | undefined;

    constructor() {
        this.app = express();
        this.port = process.env.PORT_NUMBER;
        this.serverUrl = process.env.SERVER;
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(error_handling);
    }

    private initializeRoutes(): void {
        allRoutes(this.app);
    }


    public async start(): Promise<void> {
        try {
            await database.connect();
            redis;
            this.app.listen(this.port, () => {
                console.log(`Server is running at: ${this.serverUrl} 🐳`);
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Server startup failed:', error.message);
                process.exit(1);
            }
            console.error('An unknown error occurred during server startup');
            process.exit(1);
        }
    }
}

// Create and start server instance
const server = new Server();
server.start();

// Export for testing purposes
export default server;