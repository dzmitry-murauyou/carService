import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: '/',  // важно для правильных путей на Render
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8080",  // локальный бэкенд
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true
  }
});