import { Server, Socket } from "socket.io";

export const handleRoomsInNamespace = (io: Server): void => {
  const roomsNamespace = io.of("/rooms");

  roomsNamespace.on("connection", (socket: Socket) => {
    console.log(`User connected to rooms namespace: ${socket.id}`);

    // Join a room in the namespace
    socket.on("joinRoom", (room: string) => {
      socket.join(room);
      console.log(`${socket.id} joined: ${room} in rooms namespace`);

      // Notify everyone in the room, including the sender
      roomsNamespace.to(room).emit("JoinRoomMessage", `${socket.id} has joined: ${room}`);
    });

    // Leave a room in the namespace
    socket.on("leaveRoom", (room: string) => {
      socket.leave(room);
      console.log(`${socket.id} left room: ${room} in rooms namespace`);

      // Notify everyone in the room that the user has left
      roomsNamespace.to(room).emit("LeaveRoomMessage", `${socket.id} has left: ${room}`);
    });

    // Broadcast a message to a specific room in the namespace
    socket.on("messageToRoom", ({ room, message }: { room: string, message: string }) => {
      console.log(`Message to ${room} from ${socket.id} in rooms namespace: ${message}`);

      // Emit the message to everyone in the specified room
      roomsNamespace.to(room).emit("roomMessage", `${socket.id} says: ${message}`);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected from rooms namespace: ${socket.id}`);
    });
  });
};