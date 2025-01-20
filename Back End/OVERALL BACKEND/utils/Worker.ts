import { Worker, Job } from "bullmq";
import client from "./Client";

interface EmailJobData {
    email: string;
    message: string;
}

class MyWorker {
    private readonly worker: Worker;

    constructor() {
        this.worker = new Worker<EmailJobData>("user-emails", this.processJob.bind(this), {
            connection: {
                ...client.Redis().options,
                maxRetriesPerRequest: null
            }
        });

        this.worker.on('completed', (job) => {
            console.log(`Email job ${job.id} completed successfully`);
        });

        this.worker.on('failed', (job, error) => {
            console.error(`Email job ${job?.id} failed:`, error);
        });
    }

    private async processJob(job: Job<EmailJobData>): Promise<void> {
        const { email, message } = job.data;

        await client.Email().sendMail({
            from: process.env.SMTP_FROM,
            to: email,
            subject: 'Your Email Subject',
            text: message,
            html: `<p>${message}</p>`
        });
    }

    public async close(): Promise<void> {
        await this.worker.close();
    }
}

const emailWorker = new MyWorker();
export default emailWorker;