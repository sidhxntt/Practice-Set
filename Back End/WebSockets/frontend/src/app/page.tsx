"use client";
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

// Create a Socket.IO client connection
const socket = io('http://localhost:4000');

const Home = () => {
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('message', (msg: string) => {
      setReceivedMessages((prev) => [...prev, msg]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    const message = inputRef.current?.value;  // Get the value from the inputRef

    if (message) {
      // Emit the message to the server
      socket.emit('message', message);
      inputRef.current.value = '';  // Clear the input field
    }
  };

  return (
    <div>
      <h1>Socket.IO Chat</h1>
      <input
        type="text"
        ref={inputRef}  // No need for value or onChange with useRef
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>

      <div>
        <h2>Messages:</h2>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;