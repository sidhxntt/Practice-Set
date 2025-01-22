import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";
import dotenv from "dotenv";
import { Queue } from "bullmq";
import nodemailer from "nodemailer";
import twilio from "twilio";
import promClient from "prom-client";

dotenv.config();

class Client {
  private static prisma: PrismaClient | null = null;
  private static redis: Redis | null = null;
  private static metricsInitialized = false;

  private readonly queue: Queue;
  private readonly transporter: nodemailer.Transporter;
  private readonly twilioClient: twilio.Twilio;
  private static promRegister = promClient.register;

  constructor(queueName: string = "default-queue") {
    // Initialize or reuse Prisma Client
    if (!Client.prisma) {
      Client.prisma = new PrismaClient();
    }

    // Initialize or reuse Redis Client
    if (!Client.redis) {
      Client.redis = new Redis({
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: Number(process.env.REDIS_PORT) || 6379,
      });

      Client.redis.on("connect", () => {
        console.log("Successfully connected to Redis! 🚀");
      });

      Client.redis.on("error", (err) => {
        console.error("Redis connection error:", err.stack || err);
      });
    }

    // Initialize Queue with dynamic name
    this.queue = new Queue(queueName, {
      connection: {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: Number(process.env.REDIS_PORT) || 6379,
      },
      defaultJobOptions: {
        attempts: 3,
        removeOnComplete: true,
        removeOnFail: true,
      },
    });

    // Initialize Nodemailer Transporter
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      throw new Error("SMTP credentials are not configured in the environment variables.");
    }

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Initialize Twilio Client
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      throw new Error("Twilio credentials are not configured in the environment variables.");
    }

    this.twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Initialize Prometheus Metrics (once globally)
    if (!Client.metricsInitialized) {
      promClient.collectDefaultMetrics({
        register: Client.promRegister,
      });
      Client.metricsInitialized = true;
    }
  }

  // Getters for shared resources
  public Prisma() {
    return Client.prisma!;
  }

  public Redis() {
    return Client.redis!;
  }

  public Queue() {
    return this.queue;
  }

  public Email() {
    return this.transporter;
  }

  public static getMetrics() {
    return Client.promRegister.metrics();
  }

  // Methods
  public async sendSMS(to: string, message: string): Promise<void> {
    try {
      const response = await this.twilioClient.messages.create({
        body: message,
        to,
        from: process.env.TWILIO_PHONE_NUMBER!,
      });
      console.log(`SMS sent successfully via Twilio to ${to}:`, response.sid);
    } catch (error: Error | any) {
      console.error(`Failed to send SMS via Twilio to ${to}:`, error.message || error);
    }
  }

  public async connectDB(): Promise<void> {
    try {
      await Client.prisma!.$connect();
      console.log("Successfully connected to database 🎯");
    } catch (error: Error | any) {
      console.error("Error connecting to database:", error.message || error);
    }
  }

  public async disconnectRedis(): Promise<void> {
    try {
      await Client.redis!.quit();
      console.log("Successfully disconnected from Redis 🚪");
    } catch (error : Error | any) {
      console.error("Failed to disconnect from Redis:", error.message || error);
    }
  }

  public async disconnectDB(): Promise<void> {
    try {
      await Client.prisma!.$disconnect();
      console.log("Successfully disconnected from database 🎯");
    } catch (error : Error | any) {
      console.error("Failed to disconnect from database:", error.message || error);
    }
  }
}

// Instantiate the default client
const client = new Client(); // Default to "default-queue"

// Instantiate other clients for email and SMS queues
const emailQueue = new Client("user-emails");
const smsQueue = new Client("user-sms");

export { client, emailQueue, smsQueue, Client };
