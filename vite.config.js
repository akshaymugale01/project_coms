import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { builtinModules } from 'module'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      fs: 'fs',
    }
  },
  optimizeDeps: {
    exclude: ['node-fetch'],
  },
  build: {
    rollupOptions: {
      external: ['node-fetch'],
    },
  },
});
