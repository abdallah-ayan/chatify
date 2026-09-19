import { Server } from "socket.io";
import http from "http";
import express from "express";
import "dotenv/config";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL_DEV,
    credentials: true
  }
});

io.use(socketAuthMiddleware);

const userSocketmap = {};

io.on("connection", (socket) => {
  const userId = socket.userId;

  userSocketmap[userId] = socket.id;
  console.log( "ONLINE USERS:", Object.keys(userSocketmap) );

  io.emit("getOnlineUsers", Object.keys(userSocketmap));

  socket.on("disconnect", () => {
    console.log( "USER DISCONNECTED:", socket.user.fullName );
    delete userSocketmap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketmap));
  });
});

export { io, app, server };