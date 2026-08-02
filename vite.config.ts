import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Stable vendor chunks → better long-term caching and
          // parallel downloads on first visit
          "react-vendor": ["react", "react-dom"],
          "framer-motion": ["framer-motion"],
        },
      },
    },
  },
  server: {
    proxy: {
      // Proxy /api calls to the Vercel dev server (port 3000) during local development.
      // Run `vercel dev` in terminal — it starts both Vite and the serverless functions.
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
