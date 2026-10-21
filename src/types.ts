// Описи форм даних (типи). Повторюють структуру з файлу app.js із завдання.

export interface Price {
  value: number
  symbol: 'USD' | 'UAH'
  isDefault: 0 | 1
}

export interface Order {
  id: number
  title: string
  date: string
  description: string
}

// Статус продукту з макета: «Свободен» або «В ремонте».
// У файлі app.js цього поля немає, додали його, бо воно є на скріншотах.
export type ProductStatus = 'free' | 'repair'

export interface Product {
  id: number
  serialNumber: number
  isNew: 0 | 1
  status: ProductStatus
  photo: string
  title: string
  type: string
  specification: string
  guarantee: { start: string; end: string }
  price: Price[]
  order: number // id приходу, до якого належить продукт
  date: string
}
