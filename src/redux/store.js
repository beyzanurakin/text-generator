import { configureStore } from '@reduxjs/toolkit'
import textSlice from './features/textSlice'
export const store = configureStore({
  reducer: {
    text: textSlice,
  },
})
