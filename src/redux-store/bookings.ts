import { createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'redux-store'

import { IBooking, IBookingAction, IBookingEditAction } from 'types'

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: <IBooking[]>[],
  reducers: {
    add(state, action: IBookingAction) {
      state.push(action.payload)
    },
    remove(state, action: IBookingAction) {
      return state.filter(b => b.id !== action.payload.id)
    },
    edit(state, action: IBookingEditAction) {
      return state.map(b => {
        if (b.id === action.payload.oldBooking.id) {
          return action.payload.newBooking
        }
        return b
      })
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

export const { add, remove, edit } = bookingsSlice.actions
export default bookingsSlice.reducer
