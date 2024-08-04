import cors from 'cors';
import allRoutes from "./routes/index.js";
import error_handling from "./controllers/error.js";
import express from 'express';
const app = express();
const port = 4000;
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"]
}));
app.use(express.json());
const StartServer = () => {
    try {
        app.listen(port, () => {
            console.log(`Example app listening on http://localhost:${port}`);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        else {
            console.log('An unknown error occurred');
        }
    }
};
// Use the routers
allRoutes(app);
// Error handling middleware
app.use(error_handling);
StartServer();
