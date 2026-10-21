import { DEFAULT_TYPE_ICON, STATUS_LABELS, TYPE_ICONS } from '../../constants'
import type { Product } from '../../types'
import './ProductItem.css'

interface ProductItemProps {
  product: Product
  isCompact?: boolean // у попапі показуємо лише точку, іконку, назву й номер
  onDelete?: () => void // необов'язковий: у попапі кнопки видалення немає
}

// Один рядок продукту: у панелі приходу і (стиснутий) у попапі видалення.
function ProductItem({ product, isCompact = false, onDelete }: ProductItemProps) {
  const icon = TYPE_ICONS[product.type] || DEFAULT_TYPE_ICON

  return (
    <li className={`product-item ${isCompact ? 'product-item--compact' : ''}`}>
      {/* Модифікатор залежить від статусу: product-item__dot--free або --repair */}
      <span className={`product-item__dot product-item__dot--${product.status}`} />

      <span className="product-item__photo">
        <i className={`bi ${icon}`} />
      </span>

      <span className="product-item__info">
        <span className="product-item__title">{product.title}</span>
        <span className="product-item__serial">SN-{product.serialNumber}</span>
      </span>

      {!isCompact && (
        <span className={`product-item__status product-item__status--${product.status}`}>
          {STATUS_LABELS[product.status]}
        </span>
      )}

      {!isCompact && (
        <button className="product-item__delete" type="button" aria-label="Удалить продукт" onClick={onDelete}>
          <i className="bi bi-trash3-fill" />
        </button>
      )}
    </li>
  )
}

export default ProductItem
