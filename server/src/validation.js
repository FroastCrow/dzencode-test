// Перевірка даних, які приходять з форм, на сервері.
// Фронтенд перевіряє те саме, але довіряти йому не можна: запит можна відправити
// і без нашої форми (через curl чи Postman). Сервер це остання лінія захисту бази.
// Функції повертають об'єкт помилок { поле: 'текст' }. Порожній об'єкт означає «усе добре».

// Рядок довжиною від min до max символів (пробіли по краях не рахуються).
const isText = (value, min, max) =>
  typeof value === 'string' && value.trim().length >= min && value.trim().length <= max

// Дата у форматі 2026-10-24 (так її віддає <input type="date">).
const isDate = (value) =>
  typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value))

// Ціна: число більше 0, не більше двох знаків після крапки, вміщається в DECIMAL(12, 2).
const isPrice = (value) =>
  typeof value === 'number' && value > 0 && value < 1e10 && /^\d+(\.\d{1,2})?$/.test(String(value))

export const validateOrder = (data) => {
  const errors = {}

  if (!isText(data.title, 3, 255)) errors.title = 'Название: от 3 до 255 символов'
  // Опис необов'язковий: перевіряємо лише, якщо його передали.
  if (data.description !== undefined && !isText(data.description, 0, 1000)) {
    errors.description = 'Описание: не больше 1000 символов'
  }

  return errors
}

export const validateProduct = (data) => {
  const errors = {}

  if (!isText(data.title, 2, 255)) errors.title = 'Название: от 2 до 255 символов'
  if (!Number.isInteger(data.serialNumber) || data.serialNumber <= 0 || data.serialNumber > 999999999) {
    errors.serialNumber = 'Серийный номер: только цифры, до 9 знаков'
  }
  if (!isText(data.type, 1, 50)) errors.type = 'Выберите тип'
  if (data.status !== 'free' && data.status !== 'repair') errors.status = 'Выберите статус'
  if (data.isNew !== 0 && data.isNew !== 1) errors.isNew = 'Выберите состояние'
  if (data.specification !== undefined && !isText(data.specification, 0, 1000)) {
    errors.specification = 'Спецификация: не больше 1000 символов'
  }
  if (!isDate(data.guaranteeStart)) errors.guaranteeStart = 'Укажите дату начала гарантии'
  if (!isDate(data.guaranteeEnd)) errors.guaranteeEnd = 'Укажите дату окончания гарантии'
  // Дати у форматі РРРР-ММ-ДД можна порівнювати як рядки: '2025-01-10' < '2025-02-01'.
  if (!errors.guaranteeStart && !errors.guaranteeEnd && data.guaranteeEnd < data.guaranteeStart) {
    errors.guaranteeEnd = 'Окончание гарантии не может быть раньше начала'
  }
  if (!isPrice(data.priceUsd)) errors.priceUsd = 'Цена в USD: больше 0, до 2 знаков после точки'
  if (!isPrice(data.priceUah)) errors.priceUah = 'Цена в UAH: больше 0, до 2 знаков после точки'
  if (!Number.isInteger(data.order)) errors.order = 'Не указан приход'

  return errors
}
