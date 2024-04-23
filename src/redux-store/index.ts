import { configureStore } from '@reduxjs/toolkit'

import properties from './slices/properties'

export const store = configureStore({
  reducer: {
    properties
  }
})

export type RootState = ReturnType<typeof store.getState>
