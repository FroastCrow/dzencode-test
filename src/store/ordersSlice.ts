import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../api'
import type { NewOrder, Order, OrdersState } from '../types'

// Асинхронні дії (thunk): спершу запит до сервера, потім результат потрапляє в reducer.
// createAsyncThunk сам відправляє три дії: pending (запит пішов), fulfilled (успіх), rejected (помилка).
export const fetchOrders = createAsyncThunk('orders/fetch', async () => {
  const response = await api.get<Order[]>('/orders')
  return response.data // це значення буде в action.payload у fulfilled
})

// Створити прихід: POST /api/orders. Сервер повертає новий прихід з id і датою.
export const createOrder = createAsyncThunk('orders/create', async (newOrder: NewOrder) => {
  const response = await api.post<Order>('/orders', newOrder)
  return response.data
})

export const deleteOrder = createAsyncThunk('orders/delete', async (id: number) => {
  await api.delete(`/orders/${id}`)
  return id
})

const initialState: OrdersState = {
  items: [],
  status: 'loading', // дані завантажуємо одразу при старті застосунку
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  // extraReducers: реакція на дії, які створені не в цьому slice (наші thunk).
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.status = 'failed'
      })
      // Новий прихід додаємо в кінець списку (список відсортований за id).
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      // Прибираємо прихід зі стану лише після того, як сервер підтвердив видалення.
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.items = state.items.filter((order) => order.id !== action.payload)
      })
  },
})

export default ordersSlice.reducer
