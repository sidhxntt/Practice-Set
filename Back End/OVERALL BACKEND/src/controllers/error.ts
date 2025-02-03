import { Request, Response, NextFunction } from "express";
import { Client } from "../utils/Client";

const error_handling = (err: Error, req: Request , res: Response, next: NextFunction) : void => {
    Client.logger!.error(err.message);
    res.status(500).json({
      message: 'Internal Server Error',
      error: err.message
    });
  };
  
export default error_handling;
  