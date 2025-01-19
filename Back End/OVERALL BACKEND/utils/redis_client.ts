import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

let redisInstance: Redis | null = null;

const redis_connection = async (): Promise<Redis> => {
  if (!redisInstance) {
    redisInstance = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || "6379"),
    });

    redisInstance.on("connect", () => {
      console.log("Successfully connected to Redis!");
    });

    redisInstance.on("error", (err) => {
      console.error("Redis connection error:", err);
    });
  }

  return redisInstance;
};

export { redis_connection };
