import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

// Власний хук: підключається до сервера через Socket.io і повертає кількість активних вкладок.
// null означає «ще не знаємо» (з'єднання немає або воно обірвалось).
export function useActiveTabs() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    // io() без адреси підключається до того самого сервера, з якого відкрита сторінка.
    // Під час розробки Vite пересилає /socket.io на сервер (див. vite.config.ts).
    const socket = io()

    // Сервер надсилає подію 'activeTabs' з числом щоразу, коли вкладку відкрили чи закрили.
    socket.on('activeTabs', (value: number) => setCount(value))
    // Зв'язок обірвався (наприклад, сервер зупинили): число вже неактуальне.
    socket.on('disconnect', () => setCount(null))

    // Прибирання: компонент зник, тому закриваємо з'єднання. Інакше вкладка рахувалась би двічі.
    return () => {
      socket.disconnect()
    }
  }, [])

  return count
}
