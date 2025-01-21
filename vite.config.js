import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Correct the import for vite-plugin-node-polyfills (named import)
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { NodeGlobalsPolyfillPlugin } from "./index"; // Ensure NodeGlobalsPolyfillPlugin is correctly exported from index.ts

export default defineConfig({
  plugins: [
    react(),
    // Enable the specific polyfills needed
    NodeGlobalsPolyfillPlugin({
      process: true,
      buffer: true,
      crypto: true, // Ensure that crypto is polyfilled
    }),
    nodePolyfills(), // Use nodePolyfills as a function
  ],
  resolve: {
    alias: {
      // Polyfill `crypto` for Node.js compatibility during the build
      crypto: "crypto-browserify", // Polyfill crypto module
    },
  },
});
