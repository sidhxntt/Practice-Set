import { Queue } from 'bullmq';

// Creating a new queue and providing additional options
export const email_queue = new Queue('email_queue', { 
  connection: {
    host: "192.168.29.234",
    port: 6379,
    // username: "default",   // If Redis requires authentication
    // password: "password",  // Provide password if needed
    // tls: {}                // Provide TLS options if Redis is secured
  },
//   either you can give options here meaning all the jobs added to this queue will have the following behaviour by default or you can manually customise your job behaviour in indiviual jobs while adding it in the queue.

//   defaultJobOptions: {
//     attempts: 5,           // Retry job 5 times if it fails
//     backoff: {
//       type: 'exponential', // Backoff strategy: can be 'fixed' or 'exponential'
//       delay: 5000          // Initial delay of 5 seconds before retry
//     },
//     removeOnComplete: true, // Automatically remove job once completed (FOR PRODUCTION)
//     removeOnFail: false,    // Keep failed jobs (FOR PRODUCTION)
//     timeout: 10000,         // Job times out after 10 seconds
//     delay: 0,               // Delay in milliseconds before the job is processed
//     priority: 2             // Job priority: lower number means higher priority
//   }
});

// Adding jobs with specific job names and additional options to the queue
async function addJobs() {
  const job = await email_queue.add('email_details', 
    { 
      email: "siddhantg2002@gmail.com",
      subject: "Testing",
      body: "Hey Sid wassup?"
    },
    // {
    //   attempts: 3,              // Override default attempts to 3
    //   priority: 1,              // Higher priority for this specific job
    //   jobId: 'custom_job_id_1', // Custom job ID
    //   delay: 1000,              // Delay job by 1 second
    //   timeout: 20000,           // Set timeout to 20 seconds
    //   backoff: {
    //     type: 'fixed',          // Fixed backoff for retries
    //     delay: 2000             // 2 seconds between retries
    //   },
    //   removeOnComplete: {
    //     age: 3600, // keep up to 1 hour
    //     count: 1000, // keep up to 1000 jobs
    //   },
    //   removeOnFail: {
    //     age: 24 * 3600, // keep up to 24 hours
    //   },   // Remove job when completed
    // }
  );
  console.log("Job added to queue", job.id);
}

addJobs();

// ### Explanation of the added options:

// - **Queue Creation Options**:
//   - `connection`: Includes `host`, `port`, `username`, `password`, and optional `tls` configuration if you are connecting to a secured Redis server.
//   - `defaultJobOptions`: Default options for all jobs in the queue unless overridden, including retry attempts, backoff strategy, timeout, and job removal upon completion or failure.

// - **Job Addition Options**:
//   - `attempts`: Number of retries if the job fails.
//   - `priority`: Sets the priority for the job, with a lower number indicating higher priority.
//   - `jobId`: You can assign a custom job ID.
//   - `delay`: Adds a delay before the job starts processing.
//   - `timeout`: Limits how long the job is allowed to run before being considered as failed.
//   - `backoff`: Customizes the backoff strategy and delay between retries.
