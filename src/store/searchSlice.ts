import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// Текст з поля «Поиск» у верхньому меню.
// Лежить у Redux, бо вводять його в одному компоненті (TopMenu),
// а використовують інші (сторінки приходів і продуктів).
interface SearchState {
  query: string
}

const initialState: SearchState = {
  query: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload
    },
  },
})

export const { setSearchQuery } = searchSlice.actions
export default searchSlice.reducer
