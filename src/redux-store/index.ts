import { configureStore } from '@reduxjs/toolkit'

import bookings from './slices/bookings'
import properties from './slices/properties'

export const store = configureStore({
  reducer: {
    properties,
    bookings
  }
})

export type RootState = ReturnType<typeof store.getState>
