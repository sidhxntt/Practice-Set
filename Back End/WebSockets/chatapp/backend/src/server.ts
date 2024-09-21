import express from "express";
import http from "http";
import { Server } from "socket.io";
import messages from "./events/messages";
import { handleRoomsInNamespace } from "./events/rooms";
import { PrivateMessagesNamespace } from "./events/private";

const app = express();
const server = http.createServer(app);
const PORT = 4000;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Handle client connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  const count = io.engine.clientsCount;
  console.log("Number of connected clients:", count);

  messages(socket, io); 
  handleRoomsInNamespace(io); 
  PrivateMessagesNamespace(io)

  socket.on("disconnect", (reason) => {
    console.log(`A user disconnected: ${socket.id}, Reason: ${reason}`);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});