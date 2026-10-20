import { configureStore } from '@reduxjs/toolkit'
import ordersReducer from './ordersSlice'
import productsReducer from './productsSlice'

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    products: productsReducer,
  },
})

// Типи для TypeScript: форма всього стану і тип функції dispatch.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
