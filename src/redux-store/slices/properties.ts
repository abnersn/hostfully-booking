import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'

import { RootState } from 'redux-store'
import { IPropertiesSliceState, IProperty } from 'types'

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
  }
})

export const selectProperties = (state: RootState) => state.properties.data
export const selectPropertiesStatus = (state: RootState) =>
  state.properties.status

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async () => fetch('/public/mocks/properties.json').then(res => res.json())
)

export const resetProperties = propertySlice.actions.reset
export default propertySlice.reducer
