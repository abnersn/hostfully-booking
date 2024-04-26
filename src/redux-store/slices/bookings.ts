import { createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'redux-store'

import { IBooking } from 'types'

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: <IBooking[]>[],
  reducers: {
    add(state, action) {
      state.push(action.payload)
    },
    remove(state, action: { payload: IBooking }) {
      const idx = state.findIndex(b => b.id !== action.payload.id)
      state.splice(idx, 1)
    }
  }
})

export const selectBookings = (state: RootState) => state.bookings
const selectPropertyId = (_state: RootState, propertyId: string) => propertyId
const selectBookingId = (_state: RootState, bookingId: string) => bookingId

export const selectAllBookingsForProperty = createSelector(
  [selectBookings, selectPropertyId],
  (bookings: IBooking[], propertyId) =>
    bookings.filter(booking => booking.propertyId === propertyId)
)

export const selectBookingById = createSelector(
  [selectBookings, selectBookingId],
  (bookings: IBooking[], bookingId) =>
    bookings.find(booking => booking.id === bookingId)
)

export const { add, remove } = bookingsSlice.actions
export default bookingsSlice.reducer
