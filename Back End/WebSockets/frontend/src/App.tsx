import io, { Socket } from "socket.io-client";
import { useState, useEffect, useRef } from "react";

const App = () => {
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("");
  const [joinRoomMessage, setJoinRoomMessage] = useState(""); 
  const [leaveRoomMessage, setLeaveRoomMessage] = useState(""); 
  const socket = useRef<Socket | null>(null); // Explicitly typing the ref

  useEffect(() => {
    // Initialize the socket connection inside useEffect
    socket.current = io("http://localhost:4000");

    // Emit a message to the server
    if (socket.current) {
      socket.current.emit("clientMessage", "Hello Server! This message is from client");

      // Listen for server messages and update state
      socket.current.on("serverMessage", (msg: string) => {
        setMessage1(`${msg} & SocketID: ${socket.current?.id}`);
      });

      socket.current.on("welcome", (msg: string) => {
        setMessage2(msg);
      });

      socket.current.on("welcome_again", (msg: string) => {
        setMessage3(msg);
      });

      // Listen for room-specific messages
      socket.current.on("JoinRoomMessage", (msg: string) => {
        setJoinRoomMessage(msg);
      });
      socket.current.on("LeaveRoomMessage", (msg: string) => {
        setLeaveRoomMessage(msg);
      });
    }

    return () => {
      socket.current?.disconnect();
    };
  }, []); // Keep this empty to run only on mount

  // Join a room
  const joinRoom = (roomName: string) => {
    socket.current?.emit("joinRoom", roomName);
    socket.current?.on("JoinRoomMessage", (msg: string) => {
      setJoinRoomMessage(msg);
    });
   
  };

  // Leave a room
  const leaveRoom = (roomName: string) => {
    socket.current?.emit("leaveRoom", roomName);
    setLeaveRoomMessage(`${socket.current?.id} left ${roomName}`); // Update UI immediately
  };

  // Send a message to the room
  const sendMessageToRoom = (roomName: string, message: string) => {
    socket.current?.emit("messageToRoom", { room: roomName, message });
  };

  return (
    <div>
      <p>{message1}</p>
      <p>{message2}</p>
      <p>{message3}</p>
      <h3>Room Messages</h3>
      <p>{joinRoomMessage}</p>
      <p>{leaveRoomMessage}</p>

      {/* Buttons to join, leave, and send messages to the room */}
      <button onClick={() => joinRoom("room1")}>Join Room 1</button>
      <button onClick={() => leaveRoom("room1")}>Leave Room 1</button>
      <button onClick={() => sendMessageToRoom("room1", "Hello Room 1!")}>
        Send Message to Room 1
      </button>
    </div>
  );
};

export default App;