import cors from 'cors';
import allRoutes from "./routes/index";
import error_handling from "./controllers/error";
import express, { Express, Request, Response, NextFunction } from 'express';

const app: Express = express();
const port = 4000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"]
}));

app.use(express.json());

const StartServer =  (): void => {
  try {
    app.listen(port, () => {
      console.log(`Example app listening on http://localhost:${port}`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An unknown error occurred');
      }
  }
};

// Use the routers
allRoutes(app);
// Error handling middleware
app.use(error_handling);

StartServer();
