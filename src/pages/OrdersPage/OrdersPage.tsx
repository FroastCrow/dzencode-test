import { useState } from 'react'
import OrderDetails from '../../components/OrderDetails/OrderDetails'
import OrderItem from '../../components/OrderItem/OrderItem'
import { useAppSelector } from '../../store/hooks'
import './OrdersPage.css'

function OrdersPage() {
  // useAppSelector (типізований useSelector) дістає дані з глобального стану Redux.
  const orders = useAppSelector((state) => state.orders.items)
  const products = useAppSelector((state) => state.products.items)

  // Який прихід відкритий. null означає, що панель закрита.
  // Це стан лише цієї сторінки, тому достатньо useState, Redux тут не потрібен.
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)

  // Сам об'єкт приходу не зберігаємо, а знаходимо за id. Якщо прихід видалять,
  // find поверне undefined і панель закриється сама.
  const selectedOrder = orders.find((order) => order.id === selectedOrderId)
  const isDetailsOpen = selectedOrder !== undefined

  const getOrderProducts = (orderId: number) =>
    products.filter((product) => product.order === orderId)

  return (
    <section className="orders">
      <header className="orders__header">
        {/* Форму додавання приходу зробимо на етапі валідації форм */}
        <button className="orders__add" type="button" aria-label="Добавить приход">
          <i className="bi bi-plus" />
        </button>
        <h1 className="orders__title">Приходы / {orders.length}</h1>
      </header>

      <div className={`orders__content ${isDetailsOpen ? 'orders__content--with-details' : ''}`}>
        <ul className="orders__list list-unstyled">
          {orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              products={getOrderProducts(order.id)}
              isCompact={isDetailsOpen}
              isActive={order.id === selectedOrderId}
              onSelect={() => setSelectedOrderId(order.id)}
            />
          ))}
        </ul>

        {/* && : панель малюється лише коли прихід вибрано.
            key: при виборі іншого приходу React створює панель заново, і анімація появи спрацьовує знову. */}
        {selectedOrder && (
          <OrderDetails
            key={selectedOrder.id}
            order={selectedOrder}
            products={getOrderProducts(selectedOrder.id)}
            onClose={() => setSelectedOrderId(null)}
          />
        )}
      </div>
    </section>
  )
}

export default OrdersPage
