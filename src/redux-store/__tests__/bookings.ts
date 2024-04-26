import _ from 'lodash'
import moment, { Moment } from 'moment'
import { store } from 'redux-store'
import { IBooking, IProperty } from 'types'
import * as bookings from '../bookings'
import { fetchProperties } from '../properties'

// Fill state with iniitial properties data
beforeEach(() => {
  const p = JSON.parse(JSON.stringify(properties))
  store.dispatch(fetchProperties.fulfilled(p, ''))
})

function addBooking(id: string, startDate: Moment, endDate: Moment) {
  const property: IProperty = store.getState().properties.data[0]
  const booking = {
    id,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    propertyId: property.id
  }
  store.dispatch(bookings.add(booking))
  return booking
}

function removeBooking(booking: any) {
  store.dispatch(bookings.remove(booking))
}

function editBooking(oldBooking: IBooking, newBooking: IBooking) {
  store.dispatch(
    bookings.edit({
      oldBooking,
      newBooking
    })
  )
  return newBooking
}

describe('bookings slice', () => {
  it('adds a booking', () => {
    addBooking('1', moment().add(3, 'days'), moment().add(15, 'days'))
    const state = store.getState()
    expect(state.bookings[0].id).toBe('1')
  })
  it('removes a booking', () => {
    addBooking('2', moment().add(1, 'days'), moment().add(3, 'days'))
    addBooking('3', moment().add(4, 'days'), moment().add(5, 'days'))
    const b4 = addBooking('4', moment().add(6, 'days'), moment().add(8, 'days'))

    removeBooking(b4)

    const state = store.getState()
    expect(state.bookings.length).toBe(3)
    expect(state.bookings.find(b => b.id === b4.id)).toBeFalsy()
  })
  it('edits a booking', () => {
    const oldBooking = addBooking(
      '5',
      moment().add(10, 'days'),
      moment().add(15, 'days')
    )
    const newEndDate = moment().add(40, 'days').toISOString()
    const newBooking = {
      ...oldBooking,
      endDate: newEndDate
    }
    editBooking(oldBooking, newBooking)
    const state = store.getState()

    const editResult = state.bookings.find(b => b.id === '5')
    expect(editResult?.endDate).toEqual(newEndDate)
  })
  it('selects all bookings for a property', () => {
    const state = store.getState()
    const property = state.properties.data[0]
    const bookingsIds = bookings
      .selectAllBookingsForProperty(state, property.id)
      .map(b => b.id)
    expect(_.isEqual(bookingsIds, ['1', '2', '3', '5'])).toBe(true)
  })
  it('selects bookings by id', () => {
    const state = store.getState()
    const booking = bookings.selectBookingById(state, '1')
    expect(booking).toBeTruthy()
  })
})
