"use client";
import io, { Socket } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const App = () => {
  const [recipientId, setRecipientId] = useState("");
  const [privateMessage, setPrivateMessage] = useState("");
  const [privateMessageList, setPrivateMessageList] = useState<string[]>([]); // Initialize as an array
  const socket = useRef<Socket | null>(null);
  const router = useRouter();

  useEffect(() => {
    socket.current = io("http://localhost:4000/private_message");

    if (socket.current) {
      // Listen for private messages
      socket.current.on("private message", (data) => {
        const { message, senderId } = data;
        setPrivateMessageList((prevMessages) => [
          ...prevMessages,
          `Private from ${senderId}: ${message}`,
        ]);
      });
    }

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  // Send a private message
  const sendPrivateMessage = () => {
    if (socket.current && recipientId && privateMessage) {
      socket.current.emit("private message", {
        recipientId,
        message: privateMessage,
      });
      setPrivateMessage(""); // Clear input after sending
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 text-gray-800">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900">
          Private Messaging
        </h1>

        {/* Private Messaging Section */}
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Send Private Message:
        </h3>
        <div className="flex flex-col">
            <input
          type="text"
          placeholder="Recipient ID"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Private Message"
          value={privateMessage}
          onChange={(e) => setPrivateMessage(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded"
        />  
        </div>
      
        <button
          onClick={sendPrivateMessage}
          className="mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
        >
          Send Private Message
        </button>

        {/* Private Messages Section */}
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Private Messages:
        </h3>
        <div className="border border-gray-300 p-4 h-64 overflow-y-auto bg-gray-100 rounded-lg">
          {privateMessageList.length > 0 ? (
            privateMessageList.map((msg, index) => (
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