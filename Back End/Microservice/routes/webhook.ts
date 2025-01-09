import express, { Request, Response, NextFunction } from "express";
import { initKafka, producer } from "../utils/kafka_client"; // Ensure Kafka is initialized
import prisma from "../prisma/prisma"; // Ensure prisma is correctly imported
const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await initKafka();

    const users = await prisma.user.findMany();

    // Send each user's data to Kafka
    for (const user of users) {
      await producer.send({
        topic: 'user-email', 
        messages: [
          {
            value: JSON.stringify({
              userId: user.id,   
              email: user.email, 
            }),
          },
        ],
      });
      console.log(`Sent email event for user: ${user.email}`);
    }
    res.status(200).send('Webhook received and users processed');
  } catch (error) {
    next(error);
  }
});

export default router;
