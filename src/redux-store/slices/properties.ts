import { createSlice } from '@reduxjs/toolkit'

import { RootState } from 'redux-store'
import { IProperty } from 'types'

const propertySlice = createSlice({
  name: 'properties',
  initialState: <IProperty[]>[],
  reducers: {}
})

export const selectProperties = (state: RootState) => state.properties

export default propertySlice.reducer
