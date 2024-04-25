import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'

import { RootState } from 'redux-store'
import { IPropertiesSliceState, IProperty } from 'types'
import bookProperty from 'utils/bookProperty'
import { add as addBooking } from './bookings'

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
        state.data = action.payload
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
      addBooking,
      (
        state: IPropertiesSliceState,
        action: {
          payload: { property: IProperty; startDate: Date; endDate: Date }
        }
      ) => {
        const properties = state.data
        const { property, startDate, endDate } = action.payload
        const propertyIndex = properties.findIndex(p => p.id === property.id)
        if (propertyIndex === -1) {
          return
        }
        properties[propertyIndex].schedule = bookProperty(
          property,
          startDate,
          endDate
        )
      }
    )
  }
})

export const selectProperties = (state: RootState) => state.properties.data
export const selectPropertiesStatus = (state: RootState) =>
  state.properties.status
export const selectPropertyById = (id: string) => (state: RootState) =>
  state.properties.data.find(p => p.id === id)

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async () => fetch('/public/mocks/properties.json').then(res => res.json())
)

export const resetProperties = propertySlice.actions.reset
export default propertySlice.reducer
