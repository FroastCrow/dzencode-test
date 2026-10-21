import OrderItem from '../../components/OrderItem/OrderItem'
import { useAppSelector } from '../../store/hooks'
import './OrdersPage.css'

function OrdersPage() {
  // useAppSelector (типізований useSelector) дістає дані з глобального стану Redux.
  const orders = useAppSelector((state) => state.orders.items)
  const products = useAppSelector((state) => state.products.items)

  return (
    <section className="orders">
      <header className="orders__header">
        {/* Форму додавання приходу зробимо на етапі валідації форм */}
        <button className="orders__add" type="button" aria-label="Добавить приход">
          <i className="bi bi-plus" />
        </button>
        <h1 className="orders__title">Приходы / {orders.length}</h1>
      </header>

      <ul className="orders__list list-unstyled">
        {orders.map((order) => (
          <OrderItem
            key={order.id}
            order={order}
            products={products.filter((product) => product.order === order.id)}
          />
        ))}
      </ul>
    </section>
  )
}

export default OrdersPage
