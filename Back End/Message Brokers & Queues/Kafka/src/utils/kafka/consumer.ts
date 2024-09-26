import { kafka } from "./client";

// Ensure a group ID is passed, or throw an error with a meaningful message
const group = process.argv[2];

if (!group) {
  console.error(
    "Error: A consumer group ID must be provided as a command-line argument."
  );
  process.exit(1); // Exit with a failure code
}

async function init() {
  const consumer = kafka.consumer({
    groupId: group,
    sessionTimeout: 30000,
    heartbeatInterval: 3000,
  });

  try {
    await consumer.connect();

    await consumer.subscribe({
      topics: ["rider-updates"],
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        console.log(
          `${group}: [${topic}]: PART:${partition}:`,
          message.value?.toString()
        );
      },
    });
  } catch (err) {
    console.error("An error occurred while consuming messages:", err);
    process.exit(1); // Exit the process if there's an error
  }
}

init();
