import { Worker, Job } from "bullmq";
import { smsQueue, Client } from "../Client";

interface SMSJobData {
  to: string;
  message: string;
}

export default class MySMSWorker {
  private readonly worker: Worker;

  constructor() {
    // Create a worker for the 'user-sms' queue
    this.worker = new Worker<SMSJobData>("user-sms", this.processSMSJob.bind(this), {
      connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || "6379"),
      },
    });

    // Event listeners for job completion or failure
    this.worker.on("completed", (job) => {
      Client.logger!.info(`SMS job ${job.id} completed successfully`);
    });

    this.worker.on("failed", (job, error) => {
      Client.logger!.error(`SMS job ${job?.id} failed:`, error);
    });
  }

  private async processSMSJob(job: Job<SMSJobData>): Promise<void> {
    const { to, message } = job.data;
    // Process the SMS sending
    await smsQueue.sendSMS(to, message);
    Client.logger!.info(`SMS job ${job.id} sent successfully to ${to}`);
  }

  public async close(): Promise<void> {
    await this.worker.close(); 
    Client.logger!.info("SMS worker closed successfully.");
  }
}

const smsWorker = new MySMSWorker();
export { smsWorker };