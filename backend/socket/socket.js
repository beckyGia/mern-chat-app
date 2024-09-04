import { Server } from "socket.io";
import http from "http";
import express from "express";

// Initialize Express app and HTTP server (necessary because we need a place for WebSocket traffic on the same port)
const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS support
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

// When a new client connects to the server via Socket.io
io.on("connection", (socket) => {
  // Log that a new client has connected alongside their id
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId; // represent the ID of the currently logged-in user from mongodb, their id from the users collection

  if (userId != "undefined") userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.on() is used to listen to the events. can be used both on client and server side
  // Event listener for when a client disconnects from the server
  socket.on("disconnect", () => {
    // Log that a client has disconnected
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
