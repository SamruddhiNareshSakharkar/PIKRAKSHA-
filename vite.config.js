import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets load properly on GitHub Pages (https://<user>.github.io/Pikraksha/)
  server: {
    host: '127.0.0.1',
    port: 5173,
    open: false
  }
})
