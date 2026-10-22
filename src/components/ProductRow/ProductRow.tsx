import { DEFAULT_TYPE_ICON, STATUS_LABELS, TYPE_ICONS } from '../../constants'
import type { Product } from '../../types'
import {
  formatDateLong,
  formatDateShort,
  formatMoney,
  formatMonthOfYear,
  getPrice,
  getTypeLabel,
} from '../../utils/format'
import './ProductRow.css'

interface ProductRowProps {
  product: Product
  orderTitle: string // назва приходу, до якого належить продукт
  onDelete: () => void // що зробити при кліку на кошик (вирішує сторінка)
}

// Один рядок на сторінці «Продукты»: усі поля продукту.
// (ProductItem це коротший рядок для панелі приходу й попапу.)
function ProductRow({ product, orderTitle, onDelete }: ProductRowProps) {
  const icon = TYPE_ICONS[product.type] || DEFAULT_TYPE_ICON

  return (
    <li className="product-row">
      <span className={`product-row__dot product-row__dot--${product.status}`} />

      <span className="product-row__photo">
        <i className={`bi ${icon}`} />
      </span>

      <span className="product-row__info">
        <span className="product-row__title">{product.title}</span>
        <span className="product-row__small">SN-{product.serialNumber}</span>
      </span>

      <span className={`product-row__status product-row__status--${product.status}`}>
        {STATUS_LABELS[product.status]}
      </span>

      {/* Гарантія: з якої по яку дату */}
      <span className="product-row__guarantee">
        <span>
          <span className="product-row__small product-row__from">с</span>
          {formatDateShort(product.guarantee.start)}
        </span>
        <span>
          <span className="product-row__small product-row__from">по</span>
          {formatDateShort(product.guarantee.end)}
        </span>
      </span>

      {/* isNew це 1 або 0. 0 у JS «хибне» значення, тому тернарний оператор працює. */}
      <span className="product-row__condition">{product.isNew ? 'новый' : 'Б / У'}</span>

      <span className="product-row__price">
        <span className="product-row__small">{formatMoney(getPrice(product, 'USD'))} $</span>
        <span>
          {formatMoney(getPrice(product, 'UAH'))} <span className="product-row__currency">UAH</span>
        </span>
      </span>

      <span className="product-row__type">{getTypeLabel(product.type)}</span>

      <span className="product-row__order">{orderTitle}</span>

      <span className="product-row__date">
        <span className="product-row__small">{formatMonthOfYear(product.date)}</span>
        {formatDateLong(product.date)}
      </span>

      <button className="product-row__delete" type="button" aria-label="Удалить продукт" onClick={onDelete}>
        <i className="bi bi-trash3-fill" />
      </button>
    </li>
  )
}

export default ProductRow
