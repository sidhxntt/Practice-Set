import { Server, Socket } from "socket.io";

export const initialisation = (socket: Socket, io: Server): void => {
  // Send a welcome message to the connected client
  socket.emit("welcome", "Welcome from Server!");

  // Broadcast to all clients except the sender
  socket.broadcast.emit("welcome_again", `${socket.id} joined the server`);

  // Log the new connection
  console.log(`A user connected: ${socket.id}`);

  // Listen for messages from the client
  socket.on("clientMessage", (msg: string) => {
    console.log("Message from client: " + msg);
  });

  // Send a message to the client
  socket.emit("serverMessage", "Hello Client!, This message is from server");

};
