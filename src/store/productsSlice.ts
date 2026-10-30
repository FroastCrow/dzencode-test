import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../api'
import type { NewProduct, Product, ProductsState } from '../types'
import { deleteOrder } from './ordersSlice'

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await api.get<Product[]>('/products')
  return response.data
})

// Створити продукт: POST /api/products. Сервер повертає продукт у форматі app.js (з масивом price).
export const createProduct = createAsyncThunk('products/create', async (newProduct: NewProduct) => {
  const response = await api.post<Product>('/products', newProduct)
  return response.data
})

export const deleteProduct = createAsyncThunk('products/delete', async (id: number) => {
  await api.delete(`/products/${id}`)
  return id
})

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
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload)
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
