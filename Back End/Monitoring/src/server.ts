import express, { Express } from "express";
import allRoutes from "./routes/index";
import "dotenv/config";
import error_handling from "./controllers/error";
import ResponseTime from "response-time";
import { reqResTime } from "./utils/prometheus_metrics";
import prometheus_monitoring from "./utils/prometheus_middleware";

const app: Express = express();
const port = process.env.PORT_NUMBER;
const server = process.env.SERVER

app.use(express.json());
prometheus_monitoring(app)

const StartServer = async(): Promise<void> => {
  try {
    app.listen(port, () => {
      console.log(`Example app is now listening at: ${server}🐳`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }
  }
};

allRoutes(app);
app.use(error_handling);

StartServer();
