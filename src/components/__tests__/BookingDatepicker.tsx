import { screen } from '@testing-library/react'
import BookingDatepicker from 'components/BookingDatepicker'
import { daysFromNow, renderWithProvider } from 'testUtils'
describe('<BookingDatepicker />', () => {
  it('renders empty initially', () => {
    renderWithProvider(
      <BookingDatepicker
        propertyId=''
        startDate={null}
        endDate={null}
        disabledDates={[]}
        minDate={new Date()}
        onChange={() => {}}
      />
    )
    expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument()
  })
  it('renders preset date', () => {
    renderWithProvider(
      <BookingDatepicker
        propertyId=''
        startDate={daysFromNow(3).toDate()}
        endDate={daysFromNow(5).toDate()}
        disabledDates={[]}
        minDate={new Date()}
        onChange={() => {}}
      />
    )
    const displayValue = `${daysFromNow(3).format('MMM DD, YYYY')} ~ ${daysFromNow(5).format('MMM DD, YYYY')}`
    expect(
      screen.getByPlaceholderText('Select date').getAttribute('value')
    ).toBe(displayValue)
  })
})
