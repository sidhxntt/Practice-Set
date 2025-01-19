import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import dotenv from "dotenv";

dotenv.config();

export default class Client {
    private readonly prisma: PrismaClient;
    private readonly redis: Redis;

    constructor() {
        this.prisma = new PrismaClient();
        this.redis = new Redis({
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT || "6379"),
        });

        this.redis.on("connect", () => {
            console.log("Successfully connected to Redis! 🚀");
        });

        this.redis.on("error", (err) => {
            console.error("Redis connection error:", err);
        });
    }

    public Prisma() {
        return this.prisma;
    }

    public Redis() {
        return this.redis;
    }

    public async connectDB(): Promise<void> {
        try {
          await this.prisma.$connect(); 
          console.log("Successfully connected to database 🎯");
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error connecting to database:", error.message);
          } else {
            console.error("An unknown error occurred while connecting to the database.");
          }
        }
      }
}

