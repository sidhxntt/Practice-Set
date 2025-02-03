import { Worker, Job } from "bullmq";
import { emailQueue, Client } from "../Client";

interface EmailJobData {
  email: string;
  message: string;
}

export default class MyEmailWorker {
  private readonly worker: Worker;

  constructor() {
    // Create a worker for the 'user-emails' queue
    this.worker = new Worker<EmailJobData>("user-emails", this.processEmailJob.bind(this), {
      connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || "6379"),
      },
    });

    // Event listeners for job completion or failure
    this.worker.on("completed", (job) => {
      Client.logger!.info(`Email job ${job.id} completed successfully`);
    });

    this.worker.on("failed", (job, error) => {
      Client.logger!.error(`Email job ${job?.id} failed:`, error);
    });
  }

  // This method processes each job in the queue
  private async processEmailJob(job: Job<EmailJobData>): Promise<void> {
    const { email, message } = job.data;
    
    // Process the email sending
    await emailQueue.Email().sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Your Email Subject",
      text: message,
      html: `<p>${message}</p>`,
    });

    Client.logger!.info(`Email job ${job.id} sent successfully to ${email}`);
  }

  public async close(): Promise<void> {
    await this.worker.close(); 
    Client.logger!.info("Email worker closed successfully.");
  }
}

const emailWorker = new MyEmailWorker();
export { emailWorker };
