import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 8283,
    proxy: {
      '/admin': {
        target: 'https://api.lhdd.club/admin',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
        cors: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
});
