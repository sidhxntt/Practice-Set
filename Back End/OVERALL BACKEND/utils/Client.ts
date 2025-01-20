import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import dotenv from "dotenv";
import { Queue } from "bullmq";
import nodemailer from "nodemailer";


dotenv.config();

 class Client {
    private readonly prisma: PrismaClient;
    private readonly redis: Redis;
    private readonly emailQueue: Queue;
    private readonly transporter: nodemailer.Transporter;

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

        this.emailQueue = new Queue("user-emails", {
          connection: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT || "6379"), 
          },
          defaultJobOptions:{
            attempts: 3,
            removeOnComplete: true,
            removeOnFail: true
          }
        });

          this.transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: parseInt(process.env.SMTP_PORT || "465"),
          secure: true,
          auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASSWORD,
          },
      });
    }

    public Prisma() {
        return this.prisma;
    }

    public Redis() {
        return this.redis;
    }

    public Queue(){
      return this.emailQueue;
    }
    
    public Email(){
      return this.transporter;
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

const client = new Client()
export default client