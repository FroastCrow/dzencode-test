import { useAppSelector } from '../../store/hooks'
import './ProductsPage.css'

function ProductsPage() {
  const products = useAppSelector((state) => state.products.items)

  return (
    <section className="products">
      <h1 className="products__title">Продукты / {products.length}</h1>
      {/* Фильтр по типу и полный список добавим на следующем этапе */}
      <ul className="products__list">
        {products.map((product) => (
          <li key={product.id} className="products__item">{product.title}</li>
        ))}
      </ul>
    </section>
  )
}

export default ProductsPage
