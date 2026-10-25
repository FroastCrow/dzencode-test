import { Router } from 'express'
import { pool } from '../db.js'
import { validateOrder } from '../validation.js'

// Router: окремий набір маршрутів. У index.js він підключений за адресою /api/orders,
// тому '/' тут означає /api/orders, а '/:id' означає /api/orders/5.
const router = Router()

// GET /api/orders: усі приходи.
router.get('/', async (req, res) => {
  // query повертає масив [рядки, опис_полів]. Деструктуризацією беремо лише рядки.
  const [rows] = await pool.query('SELECT id, title, description, date FROM orders ORDER BY id')
  res.json(rows)
})

// POST /api/orders: створити прихід. Дата створення ставиться автоматично (DEFAULT у схемі).
router.post('/', async (req, res) => {
  // req.body заповнює express.json() в index.js. Якщо тіла немає, беремо порожній об'єкт.
  const data = req.body ?? {}
  const errors = validateOrder(data)

  // Object.keys(errors) це масив назв полів з помилками. Якщо він не порожній, дані неправильні.
  if (Object.keys(errors).length > 0) {
    res.status(400).json({ message: 'Проверьте поля формы', errors })
    return
  }

  const [result] = await pool.query('INSERT INTO orders (title, description) VALUES (?, ?)', [
    data.title.trim(),
    data.description?.trim() ?? '',
  ])

  // insertId: id, який база видала новому рядку. Читаємо прихід назад, щоб повернути його з датою.
  const [rows] = await pool.query('SELECT id, title, description, date FROM orders WHERE id = ?', [
    result.insertId,
  ])
  res.status(201).json(rows[0]) // 201 Created: створено новий запис
})

// DELETE /api/orders/5: видалити прихід.
// Його продукти й ціни база видалить сама (ON DELETE CASCADE у схемі).
router.delete('/:id', async (req, res) => {
  // Параметри з адреси завжди рядки ('5'). Перетворюємо на число й перевіряємо.
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    res.status(400).json({ message: 'Неверный id' }) // 400: помилка в запиті клієнта
    return
  }

  // ? у запиті: mysql2 сам безпечно підставить значення (захист від SQL-ін'єкцій).
  const [result] = await pool.query('DELETE FROM orders WHERE id = ?', [id])

  if (result.affectedRows === 0) {
    res.status(404).json({ message: 'Приход не найден' })
    return
  }

  res.status(204).end() // 204 No Content: усе добре, у відповіді нічого немає
})

export default router
