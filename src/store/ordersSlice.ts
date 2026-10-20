import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Order } from '../types'
import { orders } from '../data/mockData'

// Форма цієї частини стану.
interface OrdersState {
  items: Order[]
}

const initialState: OrdersState = {
  items: orders,
}

// Slice = шматок глобального стану + функції (reducers), які його змінюють.
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    removeOrder(state, action: PayloadAction<number>) {
      state.items = state.items.filter((order) => order.id !== action.payload)
    },
  },
})

export const { removeOrder } = ordersSlice.actions
export default ordersSlice.reducer
