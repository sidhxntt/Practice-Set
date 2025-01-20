import express, { Application } from "express";
import AllRoutes from "./routes/Main_Routes";
import "dotenv/config";
import error_handling from "./controllers/error";
import client from "./utils/Client";


class Server {
    private readonly app: Application;
    private readonly port: string | number;
    private readonly serverUrl: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT_NUMBER || 3000;
        this.serverUrl = process.env.SERVER || 'http://localhost';
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(error_handling);
    }
    private initializeRoutes(): void {
        AllRoutes(this.app);
    }
 
    public async start(): Promise<void> {
        try {
            await client.connectDB();
            await client.Redis();
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

const server = new Server();
server.start();

