import type { Order, Product } from '../../types'
import ProductItem from '../ProductItem/ProductItem'
import './OrderDetails.css'

interface OrderDetailsProps {
  order: Order
  products: Product[]
  onClose: () => void // функцію закриття передає батьківський компонент
  onDeleteProduct: (productId: number) => void // що робити при кліку на кошик продукту
}

// Панель приходу, яка відкривається праворуч від списку.
function OrderDetails({ order, products, onClose, onDeleteProduct }: OrderDetailsProps) {
  return (
    <section className="order-details">
      <button className="order-details__close" type="button" aria-label="Закрыть" onClick={onClose}>
        <i className="bi bi-x-lg" />
      </button>

      <h2 className="order-details__title">{order.title}</h2>

      {/* Форму додавання продукту зробимо на етапі валідації форм */}
      <button className="order-details__add" type="button">
        <i className="order-details__add-icon bi bi-plus-circle-fill" />
        Добавить продукт
      </button>

      {products.length > 0 ? (
        <ul className="order-details__list list-unstyled">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} onDelete={() => onDeleteProduct(product.id)} />
          ))}
        </ul>
      ) : (
        <p className="order-details__empty">В этом приходе пока нет продуктов</p>
      )}
    </section>
  )
}

export default OrderDetails
