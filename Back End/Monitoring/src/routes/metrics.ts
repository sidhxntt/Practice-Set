import express, { Request, Response, NextFunction } from "express";
import { client } from "../utils/prometheus_metrics";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
    //  now we will initialise a prom server which will scrape the res for data visualisation. To do so we will configure the prom server
    //  in prometheus.confg.yml and pass it in docker compose so docker can actually run the prom server with the selected configuration.
  } catch (error) {
    next(error);
  }
});

export default router;
