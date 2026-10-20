import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../types'
import { products } from '../data/mockData'

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: products } as { items: Product[] },
  reducers: {
    // Коли видаляємо прихід, видаляємо і його продукти.
    removeProductsByOrder(state, action: PayloadAction<number>) {
      state.items = state.items.filter((product) => product.order !== action.payload)
    },
  },
})

export const { removeProductsByOrder } = productsSlice.actions
export default productsSlice.reducer
