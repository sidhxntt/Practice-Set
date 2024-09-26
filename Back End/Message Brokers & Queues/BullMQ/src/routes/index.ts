import home from './home';
import bullboard from './bullboard';
import { Application } from "express";

const allRoutes = (app: Application) => {
  app.use('/', home);
  app.use('/bullmq', bullboard);
};

export default allRoutes;