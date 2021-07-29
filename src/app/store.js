import { configureStore } from '@reduxjs/toolkit'
import directorysReducer from '../features/directotySlice'

export const store = configureStore({
  reducer: {
    directorys: directorysReducer,
  },
})
