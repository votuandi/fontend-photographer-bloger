import { configureStore } from '@reduxjs/toolkit'
import showReducer from '../slices/showSlice'

export const store = configureStore({
  reducer: {
    show: showReducer,
    // Add more reducers if you have
  },
})

export type RootState = ReturnType<typeof store.getState>
