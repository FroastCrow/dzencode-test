import { createServer } from 'node:http'
import path from 'node:path'
import express from 'express'
import ordersRouter from './routes/orders.js'
import productsRouter from './routes/products.js'
import { setupSocket } from './socket.js'

const app = express()
const PORT = process.env.PORT ?? 3000

// express.json(): розбирає тіло запиту з JSON (форми надсилають дані саме так) і кладе результат у req.body.
app.use(express.json())

// Усі адреси API починаються з /api: так їх легко відрізнити від сторінок фронтенду.
app.use('/api/orders', ordersRouter)
app.use('/api/products', productsRouter)

// Невідома адреса API: відповідаємо 404 у форматі JSON, а не HTML-сторінкою.
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Не найдено' })
})

// У Docker (NODE_ENV=production) цей самий сервер віддає і зібраний фронтенд з папки dist.
// Під час розробки фронтенд віддає Vite (npm run dev), тому тут нічого не підключаємо.
if (process.env.NODE_ENV === 'production') {
  // import.meta.dirname: папка цього файлу (server/src), dist лежить на два рівні вище.
  const distPath = path.join(import.meta.dirname, '../../dist')

  // Готові файли як є: index.html, JS, CSS, шрифти, іконки.
  app.use(express.static(distPath))

  // Будь-яка інша адреса (/orders, /products) отримує index.html, а сторінку вибирає React Router.
  // Без цього оновлення сторінки на /products давало б 404.
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

// Обробник помилок: Express викликає його, якщо в маршруті сталася помилка
// (наприклад, база недоступна). Express розпізнає його за чотирма параметрами,
// тому next потрібен, хоч і не використовується (_ на початку: «не використовується навмисно»).
app.use((error, req, res, _next) => {
  // express.json() позначає зламаний JSON у тілі запиту статусом 400: це помилка клієнта, а не сервера.
  if (error.status === 400) {
    res.status(400).json({ message: 'Неверный формат запроса' })
    return
  }

  console.error(error)
  res.status(500).json({ message: 'Ошибка сервера' })
})

// Створюємо HTTP-сервер вручну, щоб на ньому працювали і Express (запити /api), і Socket.io (/socket.io).
const httpServer = createServer(app)
setupSocket(httpServer)

httpServer.listen(PORT, () => {
  console.log(`API: http://localhost:${PORT}/api/orders`)
  if (process.env.NODE_ENV === 'production') {
    console.log(`Приложение: http://localhost:${PORT}`)
  }
})
