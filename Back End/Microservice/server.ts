import express, { Express } from "express";
import allRoutes from "./routes";
import "dotenv/config";
import error_handling from "./controllers/error";
import connectToDatabase from "./db";
import { initKafka } from "./utils/kafka_client";
import bodyParser from "body-parser";

const app: Express = express();
const port = process.env.PORT_NUMBER;
const server = process.env.SERVER

app.use(express.json());
app.use(bodyParser.json());

const StartServer = async(): Promise<void> => {
  try {
    await connectToDatabase()
    await initKafka()
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
