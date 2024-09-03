import { defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteAliases({
      prefix: '@',
      deep: true,
      createLog: true,
      logPath: 'Logs/logs',
    })
  ],
  
  server: {
    port: 5173,
  },

  optimizeDeps: {
    exclude: ['chunk-P3UNY6QC']
  }
});
