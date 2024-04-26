import { render } from '@testing-library/react'

import moment, { Moment } from 'moment'
import type { PropsWithChildren, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { fetchProperties } from 'redux-store/properties'
import { IBooking, IProperty } from 'types'
import { store } from './redux-store'
import * as bookings from './redux-store/bookings'

function CompleteTestWrapper(props: PropsWithChildren): ReactElement {
  store.dispatch(fetchProperties())
  return (
    <Provider store={store}>
      <BrowserRouter>{props.children}</BrowserRouter>
    </Provider>
  )
}

export function renderWithProviderAndRouter(ui: ReactElement): void {
  render(ui, {
    wrapper: CompleteTestWrapper
  })
}

function SimpleTestWrapper(props: PropsWithChildren): ReactElement {
  return <Provider store={store}>{props.children}</Provider>
}

export function renderWithProvider(ui: ReactElement): void {
  render(ui, {
    wrapper: SimpleTestWrapper
  })
}

export function addBooking(id: string, startDate: Moment, endDate: Moment) {
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

export function removeBooking(booking: any) {
  store.dispatch(bookings.remove(booking))
}

export function editBooking(oldBooking: IBooking, newBooking: IBooking) {
  store.dispatch(
    bookings.edit({
      oldBooking,
      newBooking
    })
  )
  return newBooking
}

export function daysFromNow(n: number) {
  return moment().add(n, 'days').startOf('day')
}
