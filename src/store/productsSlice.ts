import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../api'
import type { Product } from '../types'
import { deleteOrder } from './ordersSlice'

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await api.get<Product[]>('/products')
  return response.data
})

export const deleteProduct = createAsyncThunk('products/delete', async (id: number) => {
  await api.delete(`/products/${id}`)
  return id
})

interface ProductsState {
  items: Product[]
  status: 'loading' | 'succeeded' | 'failed'
}

const initialState: ProductsState = {
  items: [],
  status: 'loading',
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((product) => product.id !== action.payload)
      })
      // Видалили прихід: у базі його продукти вже видалені каскадно,
      // тому прибираємо їх і з нашого стану. Тут action.payload це id приходу.
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.items = state.items.filter((product) => product.order !== action.payload)
      })
  },
})

export default productsSlice.reducer
