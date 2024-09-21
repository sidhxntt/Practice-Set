import { Server, Socket } from "socket.io";

const connectedUsers: { [userId: string]: string } = {}; // Mapping user IDs to socket IDs
const socketToUser: { [socketId: string]: string } = {}; // Mapping socket IDs to user IDs

export const PrivateMessagesNamespace = (io: Server): void => {
  const privateMessagesNamespace = io.of("/private_message");

  privateMessagesNamespace.on("connection", (socket: Socket) => {
    console.log(`New connection to Private Messages namespace: ${socket.id}`);

    // Register user
    socket.on('register', (userId: string) => {
      console.log(`Registering user ${userId} with socket ${socket.id}`);
      connectedUsers[userId] = socket.id;
      socketToUser[socket.id] = userId;
      socket.emit('registration_successful', { userId, socketId: socket.id });
    });

    // Listen for private messages
    socket.on('private message', (data: { recipientId: string; message: string }) => {
      const { recipientId, message } = data;
      const senderId = socketToUser[socket.id];

      if (!senderId) {
        console.error(`Unregistered socket ${socket.id} attempted to send a message`);
        socket.emit('error', { message: 'You must register before sending messages' });
        return;
      }

      const recipientSocketId = connectedUsers[recipientId];

      if (recipientSocketId) {
        console.log(`Sending message from ${senderId} to ${recipientId}`);
        privateMessagesNamespace.to(recipientSocketId).emit('private message', {
          message,
          senderId,
        });
      } else {
        console.log(`User ${recipientId} not connected. Message from ${senderId} not delivered.`);
        socket.emit('message_not_delivered', { recipientId });
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      const userId = socketToUser[socket.id];
      if (userId) {
        console.log(`User ${userId} disconnected from Private Messages namespace`);
        delete connectedUsers[userId];
        delete socketToUser[socket.id];
      } else {
        console.log(`Unregistered socket ${socket.id} disconnected`);
      }
    });
  });
};