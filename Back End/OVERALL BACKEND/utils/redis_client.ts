import Redis from "ioredis";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

class RedisConnection {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || "localhost", 
      port: parseInt(process.env.REDIS_PORT || "6379"), 
    });

    // Binding the connect and error events when initializing
    this.connect();
    this.handleError();
  }

  private connect() {
    this.redis.on("connect", () => {
      console.log("Successfully connected to Redis! 🚀");
    });
  }

  private handleError() {
    this.redis.on("error", (err) => {
      console.error("Redis connection error:", err);
    });
  }

  // Method to close the Redis connection
  public close() {
    this.redis.quit();
  }
}
const redis = new RedisConnection()
console.log(redis)
export default redis;
