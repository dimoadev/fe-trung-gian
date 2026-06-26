import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // port mặc định của Vite
    proxy: {
      "/api": {
        target: "http://localhost:6000", // địa chỉ BE
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    sourcemap: false,
  },
});
