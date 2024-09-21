"use client";
import io, { Socket } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const App = () => {
  const [joinRoomMessage, setJoinRoomMessage] = useState("");
  const [leaveRoomMessage, setLeaveRoomMessage] = useState("");
  const [roomMessages, setRoomMessages] = useState<string[]>([]); // To store room messages
  const socket = useRef<Socket | null>(null); // Explicitly typing the ref
  const router = useRouter();

  useEffect(() => {
    socket.current = io("http://localhost:4000/rooms");

    if (socket.current) {
      // Join a room
      socket.current.emit("joinRoom", "room");
      socket.current.on("JoinRoomMessage", (msg: string) => {
        setJoinRoomMessage(msg);
        setRoomMessages((prevMessages) => [...prevMessages, msg]);
      });

      socket.current.on("LeaveRoomMessage", (msg: string) => {
        setLeaveRoomMessage(msg);
        setRoomMessages((prevMessages) => [...prevMessages, msg]);
      });
      socket.current.on("roomMessage", (msg: string) => {
        setLeaveRoomMessage(msg);
        setRoomMessages((prevMessages) => [...prevMessages, msg]);
      });
    }

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  // Leave a room
  const leaveRoom = (roomName: string) => {
    if (socket.current) {
      socket.current.emit("leaveRoom", roomName);
      router.back();
    }
  };

  // Send a message to the room
  const sendMessageToRoom = (roomName: string, message: string) => {
    if (socket.current) {
      socket.current.emit("messageToRoom", { room: roomName, message });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 text-gray-800">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900">
          Room Chat
        </h1>

        {/* Buttons Section */}
        <div className="flex flex-col mb-6">
          <button
            onClick={() => leaveRoom("room")}
            className="mb-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
          >
            Leave Room 
          </button>
          <button
            onClick={() => sendMessageToRoom("room", "Hello Room 1!")}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition"
          >
            Send Message to Room 
          </button>
        </div>

        {/* Room Messages Section */}
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Room Messages:
        </h3>
        <div className="border border-gray-300 p-4 h-64 overflow-y-auto bg-gray-100 rounded-lg">
          {roomMessages.length > 0 ? (
            roomMessages.map((msg, index) => (
              <p
                key={index}
                className="p-2 bg-gray-200 text-gray-700 rounded-lg mb-2 shadow-sm"
              >
                {msg}
              </p>
            ))
          ) : (
            <p className="text-gray-500">No messages yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
