import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";
import dotenv from "dotenv";
import { Queue } from "bullmq";
import nodemailer from "nodemailer";
import twilio from "twilio";
import promClient from "prom-client";
import { createLogger, transports } from "winston";
import LokiTransport from "winston-loki";

dotenv.config();

class Client {
  private static prisma: PrismaClient | null = null;
  private static redis: Redis | null = null;
  private static metricsInitialized = false;
  public static logger: ReturnType<typeof createLogger> | null = null;
  private static promRegister = promClient.register;

  private readonly queue: Queue;
  private readonly transporter: nodemailer.Transporter;
  private readonly twilioClient: twilio.Twilio;

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
       Client.logger!.info("Successfully connected to Redis! 🚀");
      });

      Client.redis.on("error", (err) => {
        Client.logger!.error("Redis connection error:", err.stack || err);
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

    // Initialize Logger (once globally)
    if (!Client.logger) {
      Client.logger = createLogger({
        transports: [
          new LokiTransport({
            host: "http://grafana-loki:3100",
            json: true,
            onConnectionError: (err) => console.error(err)
          }),
          new transports.Console(),
        ],
     
      });
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

  public static Logger() {
    return Client.logger!;
  }

  public static async getMetrics() {
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
      Client.logger!.info(`SMS sent successfully to ${to}: ${response.sid}`);
    } catch (error: any) {
      Client.logger!.error(`Failed to send SMS to ${to}: ${error.message || error}`);
    }
  }

  public async connectDB(): Promise<void> {
    try {
      await Client.prisma!.$connect();
      Client.logger!.info("Successfully connected to database 🎯");
    } catch (error: any) {
      Client.logger!.error("Error connecting to database:", error.message || error);
    }
  }

  public async disconnectRedis(): Promise<void> {
    try {
      await Client.redis!.quit();
      Client.logger!.info("Successfully disconnected from Redis 🚪");
    } catch (error: any) {
      Client.logger!.error("Failed to disconnect from Redis:", error.message || error);
    }
  }

  public async disconnectDB(): Promise<void> {
    try {
      await Client.prisma!.$disconnect();
      Client.logger!.info("Successfully disconnected from database 🎯");
    } catch (error: any) {
      Client.logger!.error("Failed to disconnect from database:", error.message || error);
    }
  }
}

// Instantiate the default client
const client = new Client(); // Default to "default-queue"

// Instantiate other clients for email and SMS queues
const emailQueue = new Client("user-emails");
const smsQueue = new Client("user-sms");

export { client, emailQueue, smsQueue, Client };
