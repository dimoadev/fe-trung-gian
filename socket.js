// socket.ts
import { io } from "socket.io-client";

const accessToken = localStorage.getItem("token");

export const socket = io("http://localhost:3002", {
  transports: ["websocket"],
  auth: {
    token: accessToken,
  },
});