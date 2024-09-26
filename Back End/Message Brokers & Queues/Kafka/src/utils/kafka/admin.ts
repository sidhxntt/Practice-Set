import { kafka } from "./client";

// admin creates kafka infra
//  current infra => 1 broker(kafka server) --> 1 topic(rider-updates) --> 2 partitions within a topic -> producers & 2 consumers in 1 group (user-1)

async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting...");
  admin.connect();
  console.log("Adming Connection Success...");

  console.log("Creating Topic [rider-updates]");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topic Created Success [rider-updates]");

  console.log("Disconnecting Admin..");
  await admin.disconnect();
}

init();