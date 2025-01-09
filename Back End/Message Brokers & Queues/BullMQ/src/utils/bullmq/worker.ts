import { Worker, Job } from "bullmq";

// Simulating email sending with a delay (ms is in seconds)
const sendEmail = async (ms: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms * 1000);
    });
};

// Creating a worker to process the queue with additional options
const email_worker = new Worker(
    'email_queue',
    async (job: Job) => {
        console.log(`Message received | ID: ${job.id}`);
        console.log("Processing Message");
        console.log(`Sending email to ${job.data.email}`);

        await sendEmail(5); // Simulating 5-second delay for sending the email

        console.log("Email sent");

        return { status: "success" }; // Optionally return result for the job
    },
    {
        // Worker configuration options
        connection: {
            host: "192.168.1.40",
            port: 6379,
        },
        // concurrency: 5, // Number of concurrent jobs processed
        // lockDuration: 30000, // Time in ms to hold the job lock (default: 30s)
        // limiter: {
        //     max: 1000, // Max number of jobs processed in a time window
        //     duration: 60000 // Time window in ms (1 minute)
        // },
        // settings: {
        //     maxStalledCount: 3, // Max retry attempts for stalled jobs
        //     stalledInterval: 5000, // How often to check for stalled jobs (5 seconds)
        //     backoffStrategies: {
        //         exponential: (attemptsMade) => {
        //             return Math.pow(2, attemptsMade) * 1000; // Exponential backoff
        //         }
        //     }
        // },
        autorun: true, // Automatically start processing jobs (default is true)
        // lockRenewTime: 15000, // How long to keep the lock active (15 seconds)
        // runRetryDelay: 2000, // Delay before retrying a failed job (2 seconds)
        // drainDelay: 5, // Delay in ms before next job is processed once all jobs are completed
        // jobRetention: {
        //     removeOnComplete: true, // Remove job from queue after successful completion
        //     removeOnFail: false // Keep job in the queue after failure for debugging
        // }
    }
);
// No need to call `email_worker.run()`
// The worker will automatically start processing jobs because `autorun` is true