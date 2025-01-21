import { Request, Response } from "express";
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from "dotenv";
import SERVER from "./server";

dotenv.config();

export default class API_GATEWAY extends SERVER {
    private readonly targetUrl: string;
  constructor() {
    super();
    this.port = process.env.GATEWAY_PORT_NUMBER || 3000;
    this.targetUrl = process.env.MAIN_SERVER_URL || 'http://localhost:8000';
    this.initializeMiddlewares();
    this.setupProxy();
    this.setupHealthCheck();

  }

  private setupHealthCheck(): void {
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
    });
  }

  protected setupProxy(): void {
    const proxyOptions = {
      target: this.targetUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/api/v3': '', // Optional: remove /api prefix when forwarding
      },
      onProxyReq: (proxyReq: any, req: Request, res: Response) => {
        // Add custom headers if needed
        proxyReq.setHeader('X-Proxy-Time', new Date().toISOString());
      },
      onError: (err: Error, req: Request, res: Response) => {
        console.error('Proxy Error:', err);
        res.status(500).json({
          message: 'Proxy Error',
          error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
        });
      },
      logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'error'
    };

    // Setup proxy middleware
    this.app.use('/api/v3', createProxyMiddleware(proxyOptions));

  }

  private setupLoadBalancing(): void {
    // If you need load balancing in the future, implement it here
    // This could involve multiple target servers and a round-robin or other distribution strategy
  }

}

// Create and start the Reverse Proxy Gateway
  const reverseProxyGateway = new API_GATEWAY();
  reverseProxyGateway.start(process.env.GATEWAY_URL || "http://localhost:3000");
