import { store } from 'redux-store'
import { addBooking, daysFromNow, editBooking, removeBooking } from 'testUtils'
import { IBooking } from 'types'
import {
  fetchProperties,
  selectPropertiesStatus,
  selectPropertyById
} from '../properties'

let b1: IBooking

describe('properties initial load', () => {
  it('loads properties asynchronously', () => {
    expect(store.getState().properties.status).toEqual('idle')
    store.dispatch(fetchProperties())
    expect(store.getState().properties.status).toEqual('pending')
    setImmediate(() => {
      expect(store.getState().properties.status).toEqual('success')
    })
  })
  it('handles error', () => {
    store.dispatch(fetchProperties.rejected(new Error(), ''))
    expect(store.getState().properties.status).toEqual('error')
  })
})

describe('properties schedules', () => {
  beforeEach(() => {
    const p = JSON.parse(JSON.stringify(properties))
    store.dispatch(fetchProperties.fulfilled(p, ''))
  })
  it('fills schedule when booking is added', () => {
    b1 = addBooking('1', daysFromNow(3), daysFromNow(15))
    const state = store.getState()
    const scheduleSlice = state.properties.data[0].schedule.slice(0, 15)
    expect(scheduleSlice).toBe('000111111111111')
  })
  it('clears schedule when booking is removed', () => {
    removeBooking(b1)

    const state = store.getState()
    const scheduleSlice = state.properties.data[0].schedule.slice(0, 15)
    expect(scheduleSlice).toBe('000000000000000')
  })
  it('changes schedule when booking is edited', () => {
    b1 = addBooking('1', daysFromNow(3), daysFromNow(15))
    const b1Edited = {
      ...b1,
      startDate: daysFromNow(5).toISOString(),
      endDate: daysFromNow(10).toISOString()
    }
    editBooking(b1, b1Edited)
    const state = store.getState()
    const scheduleSlice = state.properties.data[0].schedule.slice(0, 15)
    expect(scheduleSlice).toBe('000001111100000')
  })
})

describe('properties selectors', () => {
  beforeEach(() => {
    const p = JSON.parse(JSON.stringify(properties))
    store.dispatch(fetchProperties.fulfilled(p, ''))
  })
  it('selects property by id', () => {
    const property = selectPropertyById(store.getState(), properties[0].id)
    expect(property).toBeTruthy()
  })
  it('selects properties load status', () => {
    const status = selectPropertiesStatus(store.getState())
    expect(status).toBe('success')
  })
})
