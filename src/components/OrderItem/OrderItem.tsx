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
}

// Один рядок у списку приходів.
function OrderItem({ order, products }: OrderItemProps) {
  const count = products.length
  const totalUsd = sumByCurrency(products, 'USD')
  const totalUah = sumByCurrency(products, 'UAH')

  return (
    <li className="order-item">
      <span className="order-item__title">{order.title}</span>

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

      <span className="order-item__sum">
        <span className="order-item__small">{formatMoney(totalUsd)} $</span>
        <span>
          {formatMoney(totalUah)} <span className="order-item__currency">UAH</span>
        </span>
      </span>

      {/* Видалення з попапом підключимо на етапі 3 */}
      <button className="order-item__delete" type="button" aria-label="Удалить приход">
        <i className="bi bi-trash3-fill" />
      </button>
    </li>
  )
}

export default OrderItem
