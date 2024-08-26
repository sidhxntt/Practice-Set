import express, { Express, Request, Response } from "express";
import "dotenv/config";

const app: Express = express();
const port = process.env.PORT_NUMBER;
const server = process.env.SERVER

app.use(express.json());

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

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message: "Hello beby"});
});

StartServer();
