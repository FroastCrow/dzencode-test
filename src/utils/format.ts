import { TYPE_LABELS } from '../constants'
import type { Price, Product } from '../types'

// Короткі функції-помічники для відображення дат, сум і підписів.

export const MONTHS = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']

// 6 -> "06": додає нуль спереду, щоб число завжди мало дві цифри.
export const pad = (n: number) => String(n).padStart(2, '0')

// "2017-04-06 12:09:33" -> Date. Пробіл замінюємо на "T", щоб формат був коректним для всіх браузерів.
const toDate = (value: string) => new Date(value.replace(' ', 'T'))

// Перший формат дати: 06 / 04 / 2017
export const formatDateShort = (value: string) => {
  const d = toDate(value)
  return `${pad(d.getDate())} / ${pad(d.getMonth() + 1)} / ${d.getFullYear()}`
}

// Номер місяця з 12, як на макеті над датою: 04 / 12
export const formatMonthOfYear = (value: string) => {
  const d = toDate(value)
  return `${pad(d.getMonth() + 1)} / 12`
}

// Другий формат дати: 06 / Апр / 2017
export const formatDateLong = (value: string) => {
  const d = toDate(value)
  return `${pad(d.getDate())} / ${MONTHS[d.getMonth()]} / ${d.getFullYear()}`
}

// Ціна одного продукту в заданій валюті (symbol: 'USD' або 'UAH').
// ?. : якщо find нічого не знайшов (undefined), .value не читаємо і отримуємо undefined.
// ?? 0 : замість undefined повертаємо 0.
export const getPrice = (product: Product, symbol: Price['symbol']) =>
  product.price.find((p) => p.symbol === symbol)?.value ?? 0

// Сума цін продуктів у заданій валюті.
export const sumByCurrency = (products: Product[], symbol: Price['symbol']) =>
  products.reduce((total, product) => total + getPrice(product, symbol), 0)

// Підпис типу продукту: 'Monitors' -> 'Мониторы'. Якщо підпису немає, показуємо тип як є.
export const getTypeLabel = (type: string) => TYPE_LABELS[type] ?? type

// 250000.5 -> "250 000.50"
// toLocaleString('ru-RU') розбиває число пробілами на тисячі, але дробову частину
// відділяє комою ("250 000,50"). На макеті крапка, тому замінюємо кому на крапку.
export const formatMoney = (value: number) =>
  value
    .toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    .replace(',', '.')

// Правильна форма слова після числа (російська мова інтерфейсу):
// 1 продукт, 2-4 продукта, 5-20 продуктов, 21 продукт, 22 продукта, 11-14 продуктов.
export const pluralize = (count: number, forms: [string, string, string]) => {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return forms[2]
  if (lastDigit === 1) return forms[0]
  if (lastDigit >= 2 && lastDigit <= 4) return forms[1]
  return forms[2]
}
