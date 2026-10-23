import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import DataLoader from './components/DataLoader/DataLoader'
import Navigation from './components/Navigation/Navigation'
import TopMenu from './components/TopMenu/TopMenu'
import PageTransition from './components/PageTransition/PageTransition'
import OrdersPage from './pages/OrdersPage/OrdersPage'
import ProductsPage from './pages/ProductsPage/ProductsPage'

function App() {
  const location = useLocation()

  return (
    <div className="app">
      <TopMenu />
      <Navigation />
      <main className="app__content">
        {/* DataLoader поза PageTransition: інакше він створювався б заново при кожному переході
            між сторінками й щоразу завантажував дані знову. */}
        <DataLoader>
          <PageTransition locationKey={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Navigate to="/orders" replace />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/products" element={<ProductsPage />} />
            </Routes>
          </PageTransition>
        </DataLoader>
      </main>
    </div>
  )
}

export default App
