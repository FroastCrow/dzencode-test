import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Під час розробки Vite пересилає запити /api на сервер Express (порт 3000).
    // Для браузера фронтенд і API на одній адресі, тому налаштовувати CORS не треба.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
