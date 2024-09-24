import home from './home';
import slow from './slow';
import metrics from './metrics';
import { Application } from "express";

const allRoutes = (app: Application) => {
  app.use('/', home);
  app.use('/slow', slow);
  app.use('/metrics', metrics);
};

export default allRoutes;