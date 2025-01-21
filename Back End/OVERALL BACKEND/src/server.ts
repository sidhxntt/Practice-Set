import express, { Application } from "express";
import AllRoutes from "./routes/Main_Routes";
import error_handling from "./controllers/error";
import { client } from "./utils/Client";
import cors from "cors";
import GracefulShutdown from "http-graceful-shutdown";
import { emailWorker } from "./utils/workers/email";
import { smsWorker } from "./utils/workers/sms";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();

export default class SERVER {
  private  app: Application;
  private  port: string | number;
  private httpServer: any; // Store the HTTP server instance
  private serverUrl: string;

  constructor() {
    this.app = express();
    this.port = process.env.MAIN_SERVER_PORT || 8000;
    this.serverUrl = process.env.MAIN_SERVER_URL || 'http://localhost:8000';
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(
      cors({
        origin: process.env.CLIENT,
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    ),// Enable CORS
    this.app.use(express.json()); // Parse JSON bodies
    this.app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
    this.app.use(error_handling); //error handling middleware
    this.app.use(helmet()); //security middleware
  }

  private initializeRoutes(): void {
    AllRoutes(this.app);
  }

  public async start(): Promise<void> {
    try {
      await client.connectDB();
      client.Redis();

      // Store the server instance
      this.httpServer = this.app.listen(this.port, () => {
        console.log(`Server is running at: ${this.serverUrl} 🐳`);
      });

      // Apply graceful shutdown after server starts
      GracefulShutdown(this.httpServer, {
        signals: "SIGINT SIGTERM",
        timeout: 3000,
        development: false,
        forceExit: true,
        preShutdown: async () => {
          await client.disconnectRedis(); 
          await emailWorker.close();
          await smsWorker.close();
        },
        onShutdown: async () => {
          await client.disconnectDB(); 
        },
        finally: () => {
          console.log("Server gracefully shut down.");
        },
      });

    } catch (error) {
      if (error instanceof Error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
      }
      console.error("An unknown error occurred during server startup");
      process.exit(1);
    }
  }
}

const server = new SERVER();
server.start();  
