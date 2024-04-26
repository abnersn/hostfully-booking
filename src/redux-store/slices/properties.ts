import {
  SerializedError,
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit'

import { RootState } from 'redux-store'
import { IBooking, IPropertiesSliceState, IProperty } from 'types'
import { bookProperty, removeBooking } from 'utils/booking'
import * as bookings from './bookings'

const initialState: IPropertiesSliceState = {
  data: <IProperty[]>[],
  status: 'idle',
  error: null
}

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers(builder) {
    builder.addCase(
      fetchProperties.fulfilled,
      (state: IPropertiesSliceState, action: { payload: IProperty[] }) => {
        state.status = 'success'
        state.data = action.payload.map(p => {
          p.schedule = '0'.repeat(1000)
          return p
        })
      }
    )
    builder.addCase(fetchProperties.pending, (state: IPropertiesSliceState) => {
      state.status = 'pending'
    })
    builder.addCase(
      fetchProperties.rejected,
      (state: IPropertiesSliceState, action: { error: SerializedError }) => {
        state.status = 'error'
        state.error = action.error.message
      }
    )
    builder.addCase(
      bookings.add,
      (
        state: IPropertiesSliceState,
        action: {
          payload: { propertyId: string; startDate: Date; endDate: Date }
        }
      ) => {
        const properties = state.data
        const { propertyId, startDate, endDate } = action.payload
        const propertyIndex = properties.findIndex(p => p.id === propertyId)
        if (propertyIndex === -1) {
          return
        }
        properties[propertyIndex].schedule = bookProperty(
          properties[propertyIndex],
          startDate,
          endDate
        )
      }
    )
    builder.addCase(
      bookings.remove,
      (
        state: IPropertiesSliceState,
        action: {
          payload: { propertyId: string; startDate: Date; endDate: Date }
        }
      ) => {
        const properties = state.data
        const { propertyId, startDate, endDate } = action.payload
        const propertyIndex = properties.findIndex(p => p.id === propertyId)
        if (propertyIndex === -1) {
          return
        }
        properties[propertyIndex].schedule = removeBooking(
          properties[propertyIndex],
          startDate,
          endDate
        )
      }
    )
    builder.addCase(
      bookings.edit,
      (
        state: IPropertiesSliceState,
        action: {
          payload: { oldBooking: IBooking; newBooking: IBooking }
        }
      ) => {
        const properties = state.data
        const { oldBooking, newBooking } = action.payload
        const propertyIndex = properties.findIndex(
          p => p.id === oldBooking.propertyId
        )
        if (propertyIndex === -1) {
          return
        }
        properties[propertyIndex].schedule = removeBooking(
          properties[propertyIndex],
          oldBooking.startDate,
          oldBooking.endDate
        )
        properties[propertyIndex].schedule = bookProperty(
          properties[propertyIndex],
          newBooking.startDate,
          newBooking.endDate
        )
      }
    )
  }
})

export const selectProperties = (state: RootState) => state.properties.data
export const selectPropertiesStatus = (state: RootState) =>
  state.properties.status

export const selectPropertyById = createSelector(
  [state => state.properties.data, (_state, id) => id],
  (properties: IProperty[], id) => properties.find(p => p.id === id)
)
export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async () => fetch('/public/mocks/properties.json').then(res => res.json())
)

export const resetProperties = propertySlice.actions.reset
export default propertySlice.reducer
