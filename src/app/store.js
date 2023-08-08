import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/Users/userSlice'
import linkReducer from '../features/Links/linkSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    links: linkReducer
  },
})