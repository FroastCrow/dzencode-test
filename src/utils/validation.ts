// Перевірка форм на фронтенді. Ті самі правила є на сервері (server/src/validation.js):
// тут вони потрібні, щоб одразу показати помилку біля поля, а сервер захищає базу.
// Функції повертають об'єкт помилок { поле: 'текст' }. Порожній об'єкт означає «усе добре».

// Значення полів форми. У полях введення все це рядки, у числа їх перетворюємо перед відправкою.
export interface OrderFormValues {
  title: string
  description: string
}

export interface ProductFormValues {
  title: string
  serialNumber: string
  type: string
  status: string
  isNew: string
  specification: string
  guaranteeStart: string
  guaranteeEnd: string
  priceUsd: string
  priceUah: string
}

// ?: у кожного поля: помилки може й не бути.
export type OrderFormErrors = { title?: string; description?: string }

export type ProductFormErrors = {
  title?: string
  serialNumber?: string
  type?: string
  status?: string
  isNew?: string
  specification?: string
  guaranteeStart?: string
  guaranteeEnd?: string
  priceUsd?: string
  priceUah?: string
}

// Ціна: цифри, за бажанням крапка й до двох знаків після неї (15, 15.5, 15.50). Більше 0.
const isPrice = (value: string) => /^\d{1,10}(\.\d{1,2})?$/.test(value) && Number(value) > 0

// Дата з <input type="date"> приходить у форматі 2026-10-24, або порожнім рядком, якщо не вибрали.
const isDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value)

export const validateOrderForm = (values: OrderFormValues) => {
  const errors: OrderFormErrors = {}
  const title = values.title.trim()

  if (title.length < 3) errors.title = 'Введите название (не меньше 3 символов)'
  else if (title.length > 255) errors.title = 'Не больше 255 символов'

  if (values.description.trim().length > 1000) errors.description = 'Не больше 1000 символов'

  return errors
}

export const validateProductForm = (values: ProductFormValues) => {
  const errors: ProductFormErrors = {}
  const title = values.title.trim()

  if (title.length < 2) errors.title = 'Введите название (не меньше 2 символов)'
  else if (title.length > 255) errors.title = 'Не больше 255 символов'

  // ^\d{1,9}$: лише цифри, від 1 до 9 штук (щоб число вмістилося в INT у базі).
  if (!/^\d{1,9}$/.test(values.serialNumber) || Number(values.serialNumber) === 0) {
    errors.serialNumber = 'Только цифры, от 1 до 9 знаков'
  }

  if (!values.type) errors.type = 'Выберите тип'
  if (values.status !== 'free' && values.status !== 'repair') errors.status = 'Выберите статус'
  if (values.isNew !== '1' && values.isNew !== '0') errors.isNew = 'Выберите состояние'
  if (values.specification.trim().length > 1000) errors.specification = 'Не больше 1000 символов'

  if (!isDate(values.guaranteeStart)) errors.guaranteeStart = 'Укажите дату начала'
  if (!isDate(values.guaranteeEnd)) errors.guaranteeEnd = 'Укажите дату окончания'
  // Дати у форматі РРРР-ММ-ДД можна порівнювати як рядки.
  else if (isDate(values.guaranteeStart) && values.guaranteeEnd < values.guaranteeStart) {
    errors.guaranteeEnd = 'Не может быть раньше начала'
  }

  if (!isPrice(values.priceUsd)) errors.priceUsd = 'Число больше 0, до 2 знаков после точки'
  if (!isPrice(values.priceUah)) errors.priceUah = 'Число больше 0, до 2 знаков после точки'

  return errors
}

// Чи є в об'єкті помилок хоч одна: Object.keys повертає масив назв полів.
export const hasErrors = (errors: object) => Object.keys(errors).length > 0
