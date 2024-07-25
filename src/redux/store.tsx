import { configureStore } from '@reduxjs/toolkit'
import translateReducer from './translate'

export const store = configureStore({
  reducer: {
    translate : translateReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch