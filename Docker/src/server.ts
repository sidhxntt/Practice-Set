import cors from "cors";
import express, { Express } from "express";
import allRoutes from "./routes";
import "dotenv/config";
import error_handling from "./controllers/error";

const app: Express = express();
const port = process.env.PORT_NUMBER;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

app.use(express.json());

const StartServer = (): void => {
  try {
    app.listen(port, () => {
      console.log(`Example app is now listening 🐳`);
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
