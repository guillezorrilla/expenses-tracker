import { configureStore } from '@reduxjs/toolkit'
import apiSlice from '../actions/apiSlice'
import expenseSlice from '../reducer/reducer'

export const store = configureStore({
  reducer: {
    expense: expenseSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})
