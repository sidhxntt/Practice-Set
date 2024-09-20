import { Server, Socket } from "socket.io";

const setupSocket = async (io: Server) => {
  try {
    io.on("connection", (socket: Socket) => {
      console.log(`User connected: ${socket.id}`);
  
      const count = io.engine.clientsCount;
      console.log(count);
  
      // Listen for custom events from the client
      socket.on("message", (data: string) => {
        console.log(`Message received: ${data}`);
  
        // Broadcast the message to all connected clients
        io.emit("message", data);
      });
  
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  } catch (err) {
    io.engine.on("connection_error", (err) => {
      console.log(err.req);
      console.log(err.code);
      console.log(err.message);
      console.log(err.context);
    });
  }
};

export default setupSocket;
