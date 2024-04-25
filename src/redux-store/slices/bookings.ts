import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'redux-store'

import { IBooking } from 'types'

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: <IBooking[]>[],
  reducers: {
    add(state, action) {
      state.push(action.payload)
    },
    remove(state, action) {
      state = state.filter(b => b.id !== action.payload)
    }
  }
})

export const selectAllBookingsForProperty =
  (propertyId: string) => (state: RootState) =>
    state.bookings.filter(booking => booking.propertyId === propertyId)

export const selectBookingById = (bookingId: string) => (state: RootState) =>
  state.bookings.find(booking => booking.id === bookingId)

export const { add, remove } = bookingsSlice.actions
export default bookingsSlice.reducer
