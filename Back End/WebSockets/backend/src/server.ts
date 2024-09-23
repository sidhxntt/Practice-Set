import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { initialisation } from './events/initialisation';
import { rooms } from './events/rooms';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',  
    methods: ['GET', 'POST'],  // Allow GET and POST methods
    credentials: true,
  },
});

// Handle client connections
io.on('connection', (socket) => {
  const count = io.engine.clientsCount;
  console.log("Number of connected clients:", count);
  
  initialisation(socket, io);  // Call initialisation function when a user connects
  rooms(socket,io);  // Call rooms function when a user connects

  socket.on('disconnect', (reason) => {
    console.log(`A user disconnected: ${socket.id}, Reason: ${reason}`);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});