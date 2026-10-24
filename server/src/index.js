import { createServer } from 'node:http'
import express from 'express'
import ordersRouter from './routes/orders.js'
import productsRouter from './routes/products.js'
import { setupSocket } from './socket.js'

const app = express()
const PORT = process.env.PORT ?? 3000

// Усі адреси API починаються з /api: так їх легко відрізнити від сторінок фронтенду.
app.use('/api/orders', ordersRouter)
app.use('/api/products', productsRouter)

// Обробник помилок: Express викликає його, якщо в маршруті сталася помилка
// (наприклад, база недоступна). Express розпізнає його за чотирма параметрами,
// тому next потрібен, хоч і не використовується (_ на початку: «не використовується навмисно»).
app.use((error, req, res, _next) => {
  console.error(error)
  res.status(500).json({ message: 'Ошибка сервера' })
})

// Створюємо HTTP-сервер вручну, щоб на ньому працювали і Express (запити /api), і Socket.io (/socket.io).
const httpServer = createServer(app)
setupSocket(httpServer)

httpServer.listen(PORT, () => {
  console.log(`API: http://localhost:${PORT}/api/orders`)
})
