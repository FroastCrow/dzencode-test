import { useAppSelector } from '../../store/hooks'
import { formatDateLong, formatDateShort, formatMoney, sumByCurrency } from '../../utils/format'
import './OrdersPage.css'

function OrdersPage() {
  // useAppSelector (типізований useSelector) дістає дані з глобального стану Redux.
  const orders = useAppSelector((state) => state.orders.items)
  const products = useAppSelector((state) => state.products.items)

  return (
    <section className="orders">
      <h1 className="orders__title">Приходы / {orders.length}</h1>

      <ul className="orders__list">
        {orders.map((order) => {
          // Продукти, які належать саме цьому приходу.
          const orderProducts = products.filter((product) => product.order === order.id)

          return (
            <li key={order.id} className="order">
              <span className="order__title">{order.title}</span>
              <span className="order__count">{orderProducts.length} Продукта</span>
              <span className="order__date">
                <small>{formatDateShort(order.date)}</small>
                <br />
                {formatDateLong(order.date)}
              </span>
              <span className="order__sum">
                <small>{formatMoney(sumByCurrency(orderProducts, 'USD'))} $</small>
                <br />
                {formatMoney(sumByCurrency(orderProducts, 'UAH'))} UAH
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default OrdersPage
