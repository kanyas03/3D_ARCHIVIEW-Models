import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8009', // Assuming your backend runs on port 6001
        changeOrigin: true,
        secure: false,
        rewrite:(path)=>path.replace(/^\/api/,"")
      },
      '/upload': { // ADD THIS PROXY RULE
        target: 'http://localhost:8009', // Point to your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})