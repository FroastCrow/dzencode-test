import { useState } from 'react'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import OrderDetails from '../../components/OrderDetails/OrderDetails'
import OrderItem from '../../components/OrderItem/OrderItem'
import ProductItem from '../../components/ProductItem/ProductItem'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { removeOrder } from '../../store/ordersSlice'
import { removeProduct, removeProductsByOrder } from '../../store/productsSlice'
import './OrdersPage.css'

function OrdersPage() {
  // useAppSelector (типізований useSelector) дістає дані з глобального стану Redux.
  const orders = useAppSelector((state) => state.orders.items)
  const products = useAppSelector((state) => state.products.items)
  // dispatch відправляє дії (actions) у Redux, щоб змінити стан.
  const dispatch = useAppDispatch()

  // Який прихід відкритий. null означає, що панель закрита.
  // Це стан лише цієї сторінки, тому достатньо useState, Redux тут не потрібен.
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)

  // Що зараз хочуть видалити (null: попап закритий).
  const [orderIdToDelete, setOrderIdToDelete] = useState<number | null>(null)
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null)

  // Сам об'єкт приходу не зберігаємо, а знаходимо за id. Якщо прихід видалять,
  // find поверне undefined і панель закриється сама.
  const selectedOrder = orders.find((order) => order.id === selectedOrderId)
  const isDetailsOpen = selectedOrder !== undefined

  const orderToDelete = orders.find((order) => order.id === orderIdToDelete)
  const productToDelete = products.find((product) => product.id === productIdToDelete)

  const getOrderProducts = (orderId: number) =>
    products.filter((product) => product.order === orderId)

  const handleConfirmDeleteOrder = () => {
    if (!orderToDelete) return

    // Спершу продукти цього приходу, потім сам прихід.
    dispatch(removeProductsByOrder(orderToDelete.id))
    dispatch(removeOrder(orderToDelete.id))
    setOrderIdToDelete(null)
  }

  const handleConfirmDeleteProduct = () => {
    if (!productToDelete) return

    dispatch(removeProduct(productToDelete.id))
    setProductIdToDelete(null)
  }

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
              onDelete={() => setOrderIdToDelete(order.id)}
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
            onDeleteProduct={(productId) => setProductIdToDelete(productId)}
          />
        )}
      </div>

      {orderToDelete && (
        <ConfirmDialog
          title="Вы уверены, что хотите удалить этот приход?"
          onConfirm={handleConfirmDeleteOrder}
          onCancel={() => setOrderIdToDelete(null)}
        >
          {/* Показуємо, що саме буде видалено разом із приходом */}
          {getOrderProducts(orderToDelete.id).length > 0 ? (
            <ul className="list-unstyled m-0">
              {getOrderProducts(orderToDelete.id).map((product) => (
                <ProductItem key={product.id} product={product} isCompact />
              ))}
            </ul>
          ) : (
            <p className="orders__dialog-text">«{orderToDelete.title}». Продуктов в приходе нет.</p>
          )}
        </ConfirmDialog>
      )}

      {productToDelete && (
        <ConfirmDialog
          title="Вы уверены, что хотите удалить этот продукт?"
          onConfirm={handleConfirmDeleteProduct}
          onCancel={() => setProductIdToDelete(null)}
        >
          <ul className="list-unstyled m-0">
            <ProductItem product={productToDelete} isCompact />
          </ul>
        </ConfirmDialog>
      )}
    </section>
  )
}

export default OrdersPage
