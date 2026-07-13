// socket.ts
import { io } from "socket.io-client";

const accessToken = localStorage.getItem("token");

export const socket = io("https://cms.trunggian.io.vn", {
  transports: ["websocket"],
  auth: {
    token: accessToken,
  },
});