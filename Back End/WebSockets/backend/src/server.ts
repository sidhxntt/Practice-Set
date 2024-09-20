import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import  setupSocket from './socket';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

setupSocket(io); // Set up socket events


const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});