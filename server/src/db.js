import mysql from 'mysql2/promise'

// Пул з'єднань з MySQL. Пул тримає кілька відкритих з'єднань і видає їх запитам по черзі,
// щоб не підключатися до бази заново на кожен запит.
// Налаштування беремо зі змінних оточення (знадобиться в Docker), а якщо їх немає,
// то значення за замовчуванням збігаються з docker-compose.yml.
export const pool = mysql.createPool({
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? 'inventory',
  password: process.env.DB_PASSWORD ?? 'inventory',
  database: process.env.DB_NAME ?? 'inventory',
  dateStrings: true, // дати віддаємо рядком '2017-04-06 12:09:33', як в app.js
  decimalNumbers: true, // DECIMAL (ціни) як число, а не рядок '100.00'
})
