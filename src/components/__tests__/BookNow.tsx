import { screen } from '@testing-library/react'
import BookNow from 'components/BookNow'
import { daysFromNow, renderWithProvider } from 'testUtils'
import { IBooking, IProperty } from 'types'
describe('<BookNow />', () => {
  it('renders booking mode', () => {
    const property: IProperty = {
      ...properties[0],
      schedule: ''
    }
    renderWithProvider(<BookNow property={property} />)
    expect(screen.getByText('Book now!')).toBeInTheDocument()
  })
  it('renders edit mode', () => {
    const property: IProperty = {
      ...properties[0],
      schedule: ''
    }
    const booking: IBooking = {
      id: '1234',
      startDate: daysFromNow(3).toDate(),
      endDate: daysFromNow(3).toDate(),
      propertyId: property.id
    }
    renderWithProvider(<BookNow property={property} booking={booking} />)
    expect(screen.getByText('Save editions')).toBeInTheDocument()
  })
})
