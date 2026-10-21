import type { KeyboardEvent } from 'react'
import type { Order, Product } from '../../types'
import {
  formatDateLong,
  formatMoney,
  formatMonthOfYear,
  pluralize,
  sumByCurrency,
} from '../../utils/format'
import './OrderItem.css'

interface OrderItemProps {
  order: Order
  products: Product[] // продукти саме цього приходу
  isCompact: boolean // true, коли праворуч відкрита панель приходу
  isActive: boolean // true для приходу, який зараз відкритий
  onSelect: () => void // що зробити при кліку на рядок (вирішує батьківський компонент)
  onDelete: () => void // що зробити при кліку на кошик
}

// Один рядок у списку приходів.
function OrderItem({ order, products, isCompact, isActive, onSelect, onDelete }: OrderItemProps) {
  const count = products.length
  const totalUsd = sumByCurrency(products, 'USD')
  const totalUah = sumByCurrency(products, 'UAH')

  // Збираємо класи: базовий + модифікатори, які зараз потрібні.
  // filter(Boolean) прибирає false, join(' ') склеює в рядок.
  const className = [
    'order-item',
    isCompact && 'order-item--compact',
    isActive && 'order-item--active',
  ]
    .filter(Boolean)
    .join(' ')

  // Щоб рядок можна було відкрити й з клавіатури (Tab, потім Enter або пробіл).
  const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    // Реагуємо лише коли фокус на самому рядку, а не на кнопці всередині.
    if (event.target !== event.currentTarget) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault() // пробіл інакше прокрутив би сторінку
      onSelect()
    }
  }

  return (
    <li className={className} tabIndex={0} onClick={onSelect} onKeyDown={handleKeyDown}>
      {!isCompact && <span className="order-item__title">{order.title}</span>}

      <span className="order-item__icon">
        <i className="bi bi-list-ul" />
      </span>

      <span className="order-item__count">
        <span className="order-item__count-number">{count}</span>
        <span className="order-item__label">{pluralize(count, ['Продукт', 'Продукта', 'Продуктов'])}</span>
      </span>

      <span className="order-item__date">
        <span className="order-item__small">{formatMonthOfYear(order.date)}</span>
        {formatDateLong(order.date)}
      </span>

      {!isCompact && (
        <span className="order-item__sum">
          <span className="order-item__small">{formatMoney(totalUsd)} $</span>
          <span>
            {formatMoney(totalUah)} <span className="order-item__currency">UAH</span>
          </span>
        </span>
      )}

      {!isCompact && (
        <button
          className="order-item__delete"
          type="button"
          aria-label="Удалить приход"
          onClick={(event) => {
            // stopPropagation: клік по кошику не повинен «спливати» до рядка й відкривати панель.
            event.stopPropagation()
            onDelete()
          }}
        >
          <i className="bi bi-trash3-fill" />
        </button>
      )}

      {isActive && (
        <span className="order-item__arrow">
          <i className="bi bi-chevron-right" />
        </span>
      )}
    </li>
  )
}

export default OrderItem
