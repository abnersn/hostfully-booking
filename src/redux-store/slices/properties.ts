import { createSlice } from '@reduxjs/toolkit'
import { IProperty } from 'types'

import { RootState } from 'redux-store'
import mockProperties from '../../mocks/properties.json'

const propertySlice = createSlice({
  name: 'properties',
  initialState: mockProperties as IProperty[],
  reducers: {}
})

export const selectProperties = (state: RootState) => state.properties

export default propertySlice.reducer
