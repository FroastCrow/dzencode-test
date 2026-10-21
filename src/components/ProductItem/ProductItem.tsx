import { DEFAULT_TYPE_ICON, STATUS_LABELS, TYPE_ICONS } from '../../constants'
import type { Product } from '../../types'
import './ProductItem.css'

interface ProductItemProps {
  product: Product
}

// Один рядок продукту в панелі приходу.
function ProductItem({ product }: ProductItemProps) {
  const icon = TYPE_ICONS[product.type] || DEFAULT_TYPE_ICON

  return (
    <li className="product-item">
      {/* Модифікатор залежить від статусу: product-item__dot--free або --repair */}
      <span className={`product-item__dot product-item__dot--${product.status}`} />

      <span className="product-item__photo">
        <i className={`bi ${icon}`} />
      </span>

      <span className="product-item__info">
        <span className="product-item__title">{product.title}</span>
        <span className="product-item__serial">SN-{product.serialNumber}</span>
      </span>

      <span className={`product-item__status product-item__status--${product.status}`}>
        {STATUS_LABELS[product.status]}
      </span>

      {/* Видалення продукту вирішимо на етапі 3 разом із попапом */}
      <button className="product-item__delete" type="button" aria-label="Удалить продукт">
        <i className="bi bi-trash3-fill" />
      </button>
    </li>
  )
}

export default ProductItem
