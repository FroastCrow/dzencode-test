import { Router } from 'express'
import { pool } from '../db.js'
import { validateProduct } from '../validation.js'

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

// POST /api/products: створити продукт разом із двома цінами (USD і UAH).
router.post('/', async (req, res) => {
  const data = req.body ?? {}
  const errors = validateProduct(data)

  // Прихід, до якого додаємо продукт, має існувати (інакше база відхилила б зовнішній ключ).
  if (!errors.order) {
    const [orders] = await pool.query('SELECT id FROM orders WHERE id = ?', [data.order])
    if (orders.length === 0) errors.order = 'Приход не найден'
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ message: 'Проверьте поля формы', errors })
    return
  }

  // Транзакція: продукт і його ціни записуються «усе або нічого».
  // Якщо запис цін не вдасться, rollback скасує й запис продукту, і в базі не буде продукту без цін.
  // Для транзакції беремо з пулу одне з'єднання, бо всі її запити мають іти через нього.
  const connection = await pool.getConnection()
  let productId
  try {
    await connection.beginTransaction()

    const [result] = await connection.query(
      `INSERT INTO products
        (serial_number, is_new, status, title, type, specification, guarantee_start, guarantee_end, order_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.serialNumber,
        data.isNew,
        data.status,
        data.title.trim(),
        data.type.trim(),
        data.specification?.trim() ?? '',
        data.guaranteeStart,
        data.guaranteeEnd,
        data.order,
      ],
    )
    productId = result.insertId

    // VALUES ? з масивом масивів: mysql2 підставить кілька рядків одним запитом.
    await connection.query('INSERT INTO prices (product_id, value, symbol, is_default) VALUES ?', [
      [
        [productId, data.priceUsd, 'USD', 0],
        [productId, data.priceUah, 'UAH', 1],
      ],
    ])

    await connection.commit() // зафіксувати обидва записи
  } catch (error) {
    await connection.rollback() // скасувати все, що встигли записати
    throw error // далі помилку обробить обробник помилок в index.js (відповідь 500)
  } finally {
    connection.release() // повернути з'єднання в пул (і після успіху, і після помилки)
  }

  // Читаємо створений продукт назад у форматі app.js, як у GET.
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [productId])
  const [prices] = await pool.query('SELECT * FROM prices WHERE product_id = ?', [productId])
  res.status(201).json(toProduct(rows[0], prices))
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
