import type { ProductStatus } from './types'

// Підписи статусів продукту для інтерфейсу.
export const STATUS_LABELS: Record<ProductStatus, string> = {
  free: 'Свободен',
  repair: 'В ремонте',
}

// Підписи типів продукту. У даних тип англійською (як у app.js), в інтерфейсі показуємо російською.
export const TYPE_LABELS: Record<string, string> = {
  Monitors: 'Мониторы',
  Keyboards: 'Клавиатуры',
  Laptops: 'Ноутбуки',
}

// Фото продуктів у нас немає, тому показуємо іконку за типом продукту.
export const TYPE_ICONS: Record<string, string> = {
  Monitors: 'bi-display',
  Keyboards: 'bi-keyboard',
  Laptops: 'bi-laptop',
}

// Іконка для типу, якого немає в списку вище.
export const DEFAULT_TYPE_ICON = 'bi-box-seam'
