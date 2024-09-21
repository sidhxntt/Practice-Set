"use client";
import io, { Socket } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [broadcast, setBroadcast] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const socket = useRef<Socket | null>(null);
  const router = useRouter();

  useEffect(() => {
    socket.current = io("http://localhost:4000/");

    if (socket.current) {
      socket.current.on("serverMessage", (msg: string) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
      socket.current.on("welcomeUser", (msg: string) => {
        setBroadcast(msg);
      });
    }

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const messageInput = inputRef.current?.value;

    if (socket.current && messageInput) {
      socket.current.emit("clientMessage", messageInput);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 text-gray-800">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900">CHAT APP</h1>
        <div className="text-center mb-6">
          {broadcast ? (
            <div className="p-3 bg-green-100 text-green-800 rounded-lg">
              <p className="font-semibold">{broadcast}</p>
            </div>
          ) : (
            <p className="text-gray-600">Waiting for a broadcast...</p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
          <input
            type="text"
            ref={inputRef}
            placeholder="Type your message"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold"
          >
            Send
          </button>
        </form>
        <div className="text-center mb-4">
          <button
            onClick={() => {
              router.push("/rooms");
            }}
            className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition"
          >
            Join Room
          </button>
          <button
            onClick={() => {
              router.push("/private");
            }}
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition mt-3"
          >
            Private Messaging
          </button>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Messages:</h3>
          <ul className="space-y-2">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <li
                  key={index}
                  className="p-2 bg-gray-100 text-gray-800 rounded-lg shadow-sm"
                >
                  {msg}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No messages yet...</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;