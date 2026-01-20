import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/app/",   // 🔥 THIS IS THE KEY FIX

  plugins: [react()],

  resolve: {
    alias: {
      fs: "fs",
    },
  },

  optimizeDeps: {
    exclude: ["node-fetch"],
  },

  build: {
    rollupOptions: {
      external: ["node-fetch"],
    },
  },
});
