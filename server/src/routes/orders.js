import { Router } from 'express'
import { pool } from '../db.js'

// Router: окремий набір маршрутів. У index.js він підключений за адресою /api/orders,
// тому '/' тут означає /api/orders, а '/:id' означає /api/orders/5.
const router = Router()

// GET /api/orders: усі приходи.
router.get('/', async (req, res) => {
  // query повертає масив [рядки, опис_полів]. Деструктуризацією беремо лише рядки.
  const [rows] = await pool.query('SELECT id, title, description, date FROM orders ORDER BY id')
  res.json(rows)
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
