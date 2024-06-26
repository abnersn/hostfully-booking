import { configureStore } from '@reduxjs/toolkit'

import bookings from './bookings'
import properties from './properties'

export const store = configureStore({
  reducer: {
    properties,
    bookings
  }
})

export type RootState = ReturnType<typeof store.getState>
