import { Server, Socket } from "socket.io";

const messages =  (socket: Socket, io: Server) => {
      socket.on("clientMessage", (data: string) => {
        console.log(`Message received: ${data}`);
        io.emit("serverMessage", data);
      });
      socket.broadcast.emit("welcomeUser", `${socket.id} joined the server`);
};

export default messages;
