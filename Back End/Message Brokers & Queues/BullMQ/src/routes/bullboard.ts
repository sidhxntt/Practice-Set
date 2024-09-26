import express from "express";
import { ExpressAdapter } from "@bull-board/express"; 
import { createBullBoard } from "@bull-board/api";   
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter"; 
import { email_queue } from "../utils/bullmq/producer"; 

const router = express.Router();

// Set up BullBoard
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullMQAdapter(email_queue)], // Attach your BullMQ queue to BullBoard
  serverAdapter: serverAdapter,
});

// Mount BullBoard routes at /admin/queues
router.use("/admin/queues", serverAdapter.getRouter());

export default router;