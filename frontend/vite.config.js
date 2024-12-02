import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://jobboard-api-ur9k.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  base: '/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})