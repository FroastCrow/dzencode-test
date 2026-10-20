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
    // Коли видаляємо прихід, видаляємо і його продукти.
    removeProductsByOrder(state, action: PayloadAction<number>) {
      state.items = state.items.filter((product) => product.order !== action.payload)
    },
  },
})

export const { removeProductsByOrder } = productsSlice.actions
export default productsSlice.reducer
