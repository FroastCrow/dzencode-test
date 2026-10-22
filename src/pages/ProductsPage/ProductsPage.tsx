import { useState } from 'react'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import ProductItem from '../../components/ProductItem/ProductItem'
import ProductRow from '../../components/ProductRow/ProductRow'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { removeProduct } from '../../store/productsSlice'
import { getTypeLabel } from '../../utils/format'
import { matchesSearch } from '../../utils/search'
import './ProductsPage.css'

function ProductsPage() {
  const products = useAppSelector((state) => state.products.items)
  const orders = useAppSelector((state) => state.orders.items)
  const searchQuery = useAppSelector((state) => state.search.query)
  const dispatch = useAppDispatch()

  // Вибраний тип у фільтрі. Порожній рядок означає «усі типи».
  const [selectedType, setSelectedType] = useState('')
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null)

  // Список типів для select беремо з самих продуктів.
  // Set зберігає лише унікальні значення, spread [...] перетворює його назад на масив.
  const types = [...new Set(products.map((product) => product.type))]

  // Якщо продуктів вибраного типу більше немає (видалили останній), показуємо всі типи.
  const activeType = types.includes(selectedType) ? selectedType : ''

  // Продукти, які показуємо: підходять і під тип, і під пошук із верхнього меню.
  const visibleProducts = products.filter((product) => {
    const matchesType = activeType === '' || product.type === activeType
    return matchesType && matchesSearch(product.title, searchQuery)
  })

  const productToDelete = products.find((product) => product.id === productIdToDelete)

  // Назва приходу за його id. Якщо приходу немає, показуємо прочерк.
  const getOrderTitle = (orderId: number) => orders.find((order) => order.id === orderId)?.title ?? '—'

  const handleConfirmDelete = () => {
    if (!productToDelete) return

    dispatch(removeProduct(productToDelete.id))
    setProductIdToDelete(null)
  }

  return (
    <section className="products">
      <header className="products__header">
        <h1 className="products__title">Продукты / {visibleProducts.length}</h1>

        {/* label навколо select: клік по підпису «Тип:» ставить фокус у select */}
        <label className="products__filter">
          <span className="products__filter-label">Тип:</span>
          <select
            className="products__select form-select"
            value={activeType}
            onChange={(event) => setSelectedType(event.target.value)}
          >
            <option value="">Все типы</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {getTypeLabel(type)}
              </option>
            ))}
          </select>
        </label>
      </header>

      {visibleProducts.length > 0 ? (
        // Обгортка з горизонтальним скролом: якщо рядок ширший за екран, його можна прокрутити.
        <div className="products__scroll">
          <ul className="products__list list-unstyled">
            {visibleProducts.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                orderTitle={getOrderTitle(product.order)}
                onDelete={() => setProductIdToDelete(product.id)}
              />
            ))}
          </ul>
        </div>
      ) : (
        <p className="products__empty">{products.length === 0 ? 'Продуктов пока нет' : 'Ничего не найдено'}</p>
      )}

      {productToDelete && (
        <ConfirmDialog
          title="Вы уверены, что хотите удалить этот продукт?"
          onConfirm={handleConfirmDelete}
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

export default ProductsPage
