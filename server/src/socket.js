import { Server } from 'socket.io'

// Лічильник активних вкладок через Socket.io (WebSocket).
// Кожна відкрита вкладка застосунку тримає одне постійне з'єднання з сервером,
// тому кількість з'єднань і є кількістю активних вкладок.
export const setupSocket = (httpServer) => {
  // Socket.io працює поверх того самого HTTP-сервера, що й Express (той самий порт 3000).
  const io = new Server(httpServer)

  // Розіслати всім підключеним вкладкам поточну кількість з'єднань.
  // io.sockets.sockets це Map усіх підключених сокетів, size це їх кількість.
  const sendActiveTabs = () => {
    io.emit('activeTabs', io.sockets.sockets.size)
  }

  // Нова вкладка підключилась: кількість змінилась, повідомляємо всіх.
  io.on('connection', (socket) => {
    sendActiveTabs()

    // Вкладку закрили (або оновили): знову повідомляємо всіх.
    socket.on('disconnect', sendActiveTabs)
  })
}
