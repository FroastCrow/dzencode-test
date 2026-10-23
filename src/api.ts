import axios from 'axios'

// Один екземпляр Axios для всіх запитів до нашого сервера.
// baseURL додається до кожної адреси: api.get('/orders') піде на /api/orders.
// Під час розробки Vite пересилає всі запити /api на сервер Express (див. vite.config.ts).
export const api = axios.create({
  baseURL: '/api',
})
