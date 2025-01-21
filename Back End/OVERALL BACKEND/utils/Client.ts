import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";
import dotenv from "dotenv";
import { Queue } from "bullmq";
import nodemailer from "nodemailer";
import twilio from "twilio";

dotenv.config();

class Client {
  private readonly prisma: PrismaClient;
  private readonly redis: Redis;
  private readonly queue: Queue;
  private readonly transporter: nodemailer.Transporter;
  private readonly twilioClient: twilio.Twilio;

  constructor(queueName: string = "default-queue") {
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
  
    // Initialize Queue with dynamic name
    this.queue = new Queue(queueName, {
      connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || "6379"),
      },
      defaultJobOptions: {
        attempts: 3,
        removeOnComplete: true,
        removeOnFail: true,
      },
    });

    // Initialize Nodemailer Transporter
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Initialize Twilio Client
    this.twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );
  }

  public Prisma() {
    return this.prisma;
  }

  public Redis() {
    return this.redis;
  }

  public Queue() {
    return this.queue;
  }

  public Email() {
    return this.transporter;
  }

  public async sendSMS(to: string, message: string): Promise<void> {
    try {
      const response = await this.twilioClient.messages.create({
        body: message,
        to,
        from: process.env.TWILIO_PHONE_NUMBER!,
      });

      console.log(`SMS sent successfully via Twilio to ${to}:`, response.sid);
    } catch (error) {
      console.error(`Failed to send SMS via Twilio to ${to}:`, error);
    }
  }

  public async connectDB(): Promise<void> {
    try {
      await this.prisma.$connect();
      console.log("Successfully connected to database 🎯");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error connecting to database:", error.message);
      } else {
        console.error(
          "An unknown error occurred while connecting to the database."
        );
      }
    }
  }

  public async disconnectRedis(): Promise<void> {
    try {
      await this.redis.quit();
      console.log("Successfully disconnected from Redis 🚪");
    } catch (error) {
      console.error("Failed to disconnect from Redis:", error);
    }
  }

  public async disconnectDB(): Promise<void> {
    try {
      await this.prisma.$disconnect();
      console.log("Successfully disconnected from database 🎯");
    } catch (error) {
      console.error("Failed to disconnect from database:", error);
    }
  }
}

// Instantiate the default client
const client = new Client(); // Default to "default-queue"

// Instantiate other clients for email and SMS queues
const emailqueue = new Client("user-emails"); 
const smsQueue = new Client("user-sms"); 

export { client, emailqueue, smsQueue };
