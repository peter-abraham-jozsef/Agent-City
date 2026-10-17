import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path' // 👈 1. Use 'node:path', not 'path/win32'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // 👈 2. Replace __dirname with import.meta.dirname
      "@": path.resolve(import.meta.dirname, "./src"), 
    }
  }
})