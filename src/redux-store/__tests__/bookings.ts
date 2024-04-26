import { store } from 'redux-store'
import { addBooking, daysFromNow, editBooking, removeBooking } from 'testUtils'
import * as bookings from '../bookings'
import { fetchProperties } from '../properties'

// Fill state with iniitial properties data
beforeEach(() => {
  const p = JSON.parse(JSON.stringify(properties))
  store.dispatch(fetchProperties.fulfilled(p, ''))
})

describe('bookings', () => {
  it('adds a booking', () => {
    addBooking('1', daysFromNow(3), daysFromNow(15))
    const state = store.getState()
    expect(state.bookings[0].id).toBe('1')
  })
  it('removes a booking', () => {
    addBooking('2', daysFromNow(1), daysFromNow(3))
    addBooking('3', daysFromNow(4), daysFromNow(5))
    const b4 = addBooking('4', daysFromNow(6), daysFromNow(8))

    removeBooking(b4)

    const state = store.getState()
    expect(state.bookings.length).toBe(3)
    expect(state.bookings.find(b => b.id === b4.id)).toBeFalsy()
  })
  it('edits a booking', () => {
    const oldBooking = addBooking('5', daysFromNow(10), daysFromNow(15))
    const newEndDate = daysFromNow(40).toISOString()
    const newBooking = {
      ...oldBooking,
      endDate: newEndDate
    }
    editBooking(oldBooking, newBooking)
    const state = store.getState()

    const editResult = state.bookings.find(b => b.id === '5')
    expect(editResult?.endDate).toEqual(newEndDate)
  })
})

describe('bookings selectors', () => {
  it('selects all bookings for a property', () => {
    const state = store.getState()
    const property = state.properties.data[0]
    const bookingsIds = bookings
      .selectAllBookingsForProperty(state, property.id)
      .map(b => b.id)
    expect(bookingsIds).toEqual(['1', '2', '3', '5'])
  })
  it('selects bookings by id', () => {
    const state = store.getState()
    const booking = bookings.selectBookingById(state, '1')
    expect(booking).toBeTruthy()
  })
})
