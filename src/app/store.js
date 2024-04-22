import { configureStore } from '@reduxjs/toolkit'
import reducerSlice from '../features/reducer/reducerSlice'

export const store = configureStore({
  reducer: {
    reducer: reducerSlice,
  },
})