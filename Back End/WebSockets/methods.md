Socket.IO provides several useful methods for handling various aspects of real-time communication, such as joining rooms, leaving rooms, emitting events, broadcasting, and more. Let’s go through these methods in detail:

### 1. **`socket.join(room)`**
This method allows a client to join a specific **room**. Once a client joins a room, the server can send targeted messages to that client or all clients in that room.

- **Purpose**: Assign a socket to a room so that messages can be sent specifically to that group of users.
- **Arguments**: 
  - `room`: A string identifier for the room.

Example:
```javascript
// Server-side
io.on('connection', (socket) => {
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });
});
```

- **Client-side**:
```javascript
socket.emit('joinRoom', 'room1'); // Request to join room 'room1'
```

---

### 2. **`socket.leave(room)`**
This method allows a client to leave a specific room.

- **Purpose**: To remove a client from a room so that they no longer receive messages targeted at that room.
- **Arguments**:
  - `room`: A string identifier for the room.

Example:
```javascript
// Server-side
io.on('connection', (socket) => {
  socket.on('leaveRoom', (room) => {
    socket.leave(room);
    console.log(`User left room: ${room}`);
  });
});
```

- **Client-side**:
```javascript
socket.emit('leaveRoom', 'room1'); // Request to leave room 'room1'
```

---

### 3. **`io.in(room)`**
This method allows the server to target all clients in a specific room.

- **Purpose**: To send a message or event to all clients that are part of a particular room.
- **Arguments**:
  - `room`: A string identifier for the room.

Example:
```javascript
// Server-side: Emit an event to all clients in 'room1'
io.in('room1').emit('message', 'This message is for all clients in room1');
```

---

### 4. **`socket.to(room)`**
This method is similar to `io.in(room)`, but it emits the event to everyone in the specified room **except the sender**.

- **Purpose**: To broadcast a message to all clients in a room except the client that triggered the event.
- **Arguments**:
  - `room`: A string identifier for the room.

Example:
```javascript
// Server-side: Broadcast a message to room1, excluding the sender
io.on('connection', (socket) => {
  socket.on('sendToRoom', (room, msg) => {
    socket.to(room).emit('message', msg); // Exclude the sender
  });
});
```

---

### 5. **`socket.emit(event, data)`**
This method sends an event to a specific socket (either server-to-client or client-to-server). The event can carry data, and it can be handled by the other side.

- **Purpose**: To emit an event from one side of the connection (client or server) to the other side.
- **Arguments**:
  - `event`: The name of the event being emitted.
  - `data`: Optional data that accompanies the event.

Example:
```javascript
// Server-side: Emit a custom event to a single client
io.on('connection', (socket) => {
  socket.emit('welcome', 'Welcome to the server!');
});
```

---

### 6. **`io.emit(event, data)`**
This method broadcasts an event to **all connected clients**.

- **Purpose**: To emit an event globally to all clients.
- **Arguments**:
  - `event`: The name of the event being emitted.
  - `data`: Optional data to be sent with the event.

Example:
```javascript
// Server-side: Emit a message to all clients
io.emit('message', 'This message is for all clients');
```

---

### 7. **`socket.broadcast.emit(event, data)`**
This method sends an event to **all clients except the one that triggered the event**. It is useful in cases where you don’t want the sender to receive its own event (e.g., in chat applications).

- **Purpose**: To send a message to all clients except the one that emitted the event.
- **Arguments**:
  - `event`: The event name.
  - `data`: Optional data to be sent with the event.

Example:
```javascript
// Server-side: Broadcast an event to all clients except the sender
io.on('connection', (socket) => {
  socket.broadcast.emit('message', 'A new user has joined the chat!');
});
```

---

### 8. **`socket.disconnect([close])`**
This method forces a client to disconnect from the server.

- **Purpose**: To manually disconnect a socket. If the `close` argument is `true`, it will close the underlying socket.
- **Arguments**:
  - `close` (optional): A boolean value to close the underlying socket (default is `false`).

Example:
```javascript
// Server-side: Disconnect a client manually
io.on('connection', (socket) => {
  // After some condition, disconnect the socket
  socket.disconnect();
});
```

---

### 9. **`socket.rooms`**
This is a property that holds all the rooms the socket is currently part of. A socket automatically joins its own unique room upon connection (the room's name is the socket ID).

- **Purpose**: To check which rooms a socket is part of.
- **Usage**: This is not a method but a property, so you can access it directly.

Example:
```javascript
// Server-side: Check which rooms a socket belongs to
io.on('connection', (socket) => {
  console.log(socket.rooms); // Will include the socket's own ID
});
```

---

### 10. **`socket.on(event, callback)`**
This method listens for an event from the client (or server). The callback function is executed when the event is received.

- **Purpose**: To handle specific events sent from the other side (client or server).
- **Arguments**:
  - `event`: The event name to listen for.
  - `callback`: The function to execute when the event is received.

Example:
```javascript
// Server-side: Listen for a custom event from the client
io.on('connection', (socket) => {
  socket.on('chatMessage', (msg) => {
    console.log('Message received: ' + msg);
  });
});
```

---

### 11. **`io.of(namespace)`**
This method creates or gets a **namespace**. Namespaces are used to separate different channels of communication. Each namespace operates independently.

- **Purpose**: To create logical communication channels that don’t interfere with each other.
- **Arguments**:
  - `namespace`: A string that identifies the namespace.

Example:
```javascript
// Server-side: Creating namespaces
const chatNamespace = io.of('/chat');
chatNamespace.on('connection', (socket) => {
  console.log('User connected to /chat namespace');
  socket.emit('message', 'Welcome to the chat namespace!');
});

const newsNamespace = io.of('/news');
newsNamespace.on('connection', (socket) => {
  console.log('User connected to /news namespace');
  socket.emit('message', 'Welcome to the news namespace!');
});
```

- **Client-side**:
```javascript
// Connect to the chat namespace
const chatSocket = io('/chat');

// Connect to the news namespace
const newsSocket = io('/news');
```

---

### 12. **`io.sockets`**
The `io.sockets` object is shorthand for the default namespace (`/`), and it contains all connected sockets.

- **Purpose**: To access all connected sockets or broadcast to them.
- **Usage**: You can use `io.sockets` or just `io`.

Example:
```javascript
// Server-side: Emit an event to all connected clients
io.sockets.emit('message', 'Hello to all clients');
```

---

### 13. **`io.clients(callback)` (Deprecated)**
In older versions of Socket.IO, this method was used to get the list of connected clients. However, it is now deprecated, and you should use `io.sockets.adapter.rooms` to manage room occupants.

Example:
```javascript
// Server-side: Get list of clients in a room (modern way)
const clients = io.sockets.adapter.rooms['room1'].sockets;
console.log(clients);
```

---

### 14. **`socket.compress(flag)`**
This method is used to specify whether the emitted data should be compressed (by default, it is compressed).

- **Purpose**: To enable or disable compression for the emitted message.
- **Arguments**:
  - `flag`: Boolean value indicating whether to compress the message.

Example:
```javascript
// Server-side: Emit without compression
socket.compress(false).emit('message', 'This message is not compressed');
```

---

### Summary of Common Methods:
- `socket.join(room)`: Join a room.
- `socket.leave(room)`: Leave a room.
- `io.in(room)`: Send to all clients in a room.
- `socket.to(room)`: Broadcast to all clients in a room except the sender.
- `socket.emit(event, data)`: Emit an event to a client or the server.
- `io.emit(event, data)`: Emit an event to all clients.
- `socket.broadcast.emit(event, data)`: Broadcast to all clients except the sender.
- `socket.disconnect()`: Force