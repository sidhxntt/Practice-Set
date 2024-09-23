import { Server, Socket } from "socket.io";

export const rooms = (socket: Socket, io: Server): void => {
  // Join a room
  socket.on("joinRoom", (room: string) => {
    socket.join(room);
    console.log(`${socket.id} joined: ${room}`);

    // Notify everyone in the room, including the sender
    io.to(room).emit("JoinRoomMessage", `${socket.id} has joined: ${room}`);
  });

  // Leave a room
  socket.on("leaveRoom", (room: string) => {
    socket.leave(room);
    console.log(`${socket.id} left room: ${room}`);

    // Notify everyone in the room that the user has left
    io.to(room).emit("LeaveRoomMessage", `${socket.id} has left: ${room}`);
  });

  // Broadcast a message to a specific room
  socket.on("messageToRoom", ({ room, message }: { room: string, message: string }) => {
    console.log(`Message to ${room} from ${socket.id}: ${message}`);

    // Emit the message to everyone in the specified room
    io.to(room).emit("roomMessage", `${socket.id} says: ${message}`);
  });
};