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

export interface OrdersState {
  items: Order[]
  status: 'loading' | 'succeeded' | 'failed' // стан завантаження списку з сервера
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

export interface ProductsState {
  items: Product[]
  status: 'loading' | 'succeeded' | 'failed'
}

// Дані для створення приходу (з форми). id і дату призначає сервер.
export interface NewOrder {
  title: string
  description: string
}

// Дані для створення продукту (з форми). Плоский об'єкт: так простіше перевіряти на сервері,
// а в масив price і об'єкт guarantee дані збирає сервер.
export interface NewProduct {
  title: string
  serialNumber: number
  type: string
  status: ProductStatus
  isNew: 0 | 1
  specification: string
  guaranteeStart: string // '2026-10-24'
  guaranteeEnd: string
  priceUsd: number
  priceUah: number
  order: number // id приходу
}
