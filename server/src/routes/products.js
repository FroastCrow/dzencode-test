import { Router } from 'express'
import { pool } from '../db.js'

const router = Router()

// Рядок таблиці products + його ціни -> об'єкт продукту у форматі app.js.
// У базі назви полів через підкреслення (serial_number), у JavaScript camelCase (serialNumber),
// а ціни лежать в окремій таблиці, тому збираємо їх у масив price.
const toProduct = (row, prices) => ({
  id: row.id,
  serialNumber: row.serial_number,
  isNew: row.is_new,
  status: row.status,
  photo: row.photo,
  title: row.title,
  type: row.type,
  specification: row.specification,
  guarantee: { start: row.guarantee_start, end: row.guarantee_end },
  price: prices
    .filter((price) => price.product_id === row.id)
    .map((price) => ({ value: price.value, symbol: price.symbol, isDefault: price.is_default })),
  order: row.order_id,
  date: row.date,
})

// GET /api/products: усі продукти з цінами.
// Два простих запити (продукти й усі ціни) замість окремого запиту цін для кожного продукту.
router.get('/', async (req, res) => {
  const [products] = await pool.query('SELECT * FROM products ORDER BY id')
  const [prices] = await pool.query('SELECT * FROM prices')
  res.json(products.map((row) => toProduct(row, prices)))
})

// DELETE /api/products/5: видалити продукт (його ціни база видалить сама).
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    res.status(400).json({ message: 'Неверный id' })
    return
  }

  const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id])

  if (result.affectedRows === 0) {
    res.status(404).json({ message: 'Продукт не найден' })
    return
  }

  res.status(204).end()
})

export default router
