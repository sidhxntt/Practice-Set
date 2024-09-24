import { Application } from "express";
import { inProgressRequests, reqResTime, requestDuration, totalRequests } from "./prometheus_metrics";

const prometheus_monitoring =(app: Application) =>{
    app.use((req, res, next) => {
        // Increment total requests and in-progress requests at the start of each request
        totalRequests.labels(req.method || '', req.url || '', 'pending').inc();
        inProgressRequests.labels(req.method || '', req.url || '').inc();
      
        const start = Date.now();  // Capture the start time of the request
      
        // Hook into the response 'finish' event to track when the request is done
        res.on('finish', () => {
          const duration = Date.now() - start;  // Calculate how long the request took
      
          // Update reqResTime (Histogram) with the duration of the request
          reqResTime.labels(
            req.method || '',
            req.url || '',
            String(res.statusCode)
          ).observe(duration);
      
          // Update requestDuration (Summary) with the duration of the request
          requestDuration.labels(
            req.method || '',
            req.url || '',
            String(res.statusCode)
          ).observe(duration);
      
          // Decrement the in-progress request count as the request is now finished
          inProgressRequests.labels(req.method || '', req.url || '').dec();
      
          // Update totalRequests with the actual status code (from 'pending' to final status)
          totalRequests.labels(req.method || '', req.url || '', String(res.statusCode)).inc();
        });
      
        next();  // Pass control to the next middleware
      });
}

export default prometheus_monitoring