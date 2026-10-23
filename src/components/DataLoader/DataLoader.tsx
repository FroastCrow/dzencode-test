import { useEffect, type ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchOrders } from '../../store/ordersSlice'
import { fetchProducts } from '../../store/productsSlice'
import './DataLoader.css'

interface DataLoaderProps {
  children: ReactNode
}

// Завантажує приходи й продукти з сервера.
// Поки дані не готові, замість сторінки показує спінер або повідомлення про помилку.
function DataLoader({ children }: DataLoaderProps) {
  const dispatch = useAppDispatch()
  const ordersStatus = useAppSelector((state) => state.orders.status)
  const productsStatus = useAppSelector((state) => state.products.status)

  // Один раз при появі компонента відправляємо обидва запити (вони йдуть паралельно).
  useEffect(() => {
    dispatch(fetchOrders())
    dispatch(fetchProducts())
  }, [dispatch])

  if (ordersStatus === 'failed' || productsStatus === 'failed') {
    return (
      <p className="data-loader data-loader--error">
        Не удалось загрузить данные с сервера. Проверьте, что сервер и база запущены, и обновите страницу.
      </p>
    )
  }

  if (ordersStatus === 'loading' || productsStatus === 'loading') {
    return (
      <div className="data-loader">
        {/* Спінер з Bootstrap. Текст для екранних читачів, візуально прихований. */}
        <div className="spinner-border data-loader__spinner" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    )
  }

  return children
}

export default DataLoader
