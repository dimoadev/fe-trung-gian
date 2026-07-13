// socket.ts
import { io } from "socket.io-client";

const accessToken = localStorage.getItem("token");

export const socket = io("https://api.trunggian.io.vn", {
  transports: ["websocket"],
  auth: {
    token: accessToken,
  },
});