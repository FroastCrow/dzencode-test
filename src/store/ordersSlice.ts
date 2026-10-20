import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Order } from '../types'
import { orders } from '../data/mockData'

// Slice = шматок глобального стану + функції (reducers), які його змінюють.
const ordersSlice = createSlice({
  name: 'orders',
  initialState: { items: orders } as { items: Order[] },
  reducers: {
    removeOrder(state, action: PayloadAction<number>) {
      state.items = state.items.filter((order) => order.id !== action.payload)
    },
  },
})

export const { removeOrder } = ordersSlice.actions
export default ordersSlice.reducer
