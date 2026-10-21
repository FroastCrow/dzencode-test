import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../types'
import { products } from '../data/mockData'

interface ProductsState {
  items: Product[]
}

const initialState: ProductsState = {
  items: products,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Видалити один продукт за його id.
    removeProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter((product) => product.id !== action.payload)
    },
    // Коли видаляємо прихід, видаляємо і його продукти.
    removeProductsByOrder(state, action: PayloadAction<number>) {
      state.items = state.items.filter((product) => product.order !== action.payload)
    },
  },
})

export const { removeProduct, removeProductsByOrder } = productsSlice.actions
export default productsSlice.reducer
