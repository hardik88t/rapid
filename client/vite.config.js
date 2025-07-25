import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3800',
        secure: false,
      },
      '/app': {
        target: 'http://localhost:4001',
        secure: false,
      },
    },
  },
  plugins: [react()],
})
