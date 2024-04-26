import { render, screen } from '@testing-library/react'
import Amenities from 'components/Amenities'

describe('<Amenities />', () => {
  it('renders amenities', () => {
    render(
      <Amenities
        property={{
          id: 'aef38f35-d4d4-4b0b-8b45-62b4e9635c94',
          title: '',
          description: '',
          owner: 'Olivia Smith',
          location: 'Santorini',
          picture: '',
          country: 'Greece',
          hasWifi: true,
          hasTV: true,
          hasAC: false,
          hasSingleBed: false,
          hasDoubleBed: true,
          breakfastIncluded: false,
          rating: 9.2,
          pricingPerNight: 250,
          schedule: ''
        }}
      />
    )
    expect(screen.getByText('Free wifi')).toBeInTheDocument()
    expect(screen.getByText('TV')).toBeInTheDocument()
    expect(() => screen.getByText('Breakfast')).toThrow()
    expect(() => screen.getByText('Air Conditioner')).toThrow()
    expect(screen.getByText('Double bed')).toBeInTheDocument()
    expect(() => screen.getByText('Single bed')).toThrow()
  })
  it('does not render empty amenities', () => {
    render(
      <Amenities
        property={{
          id: 'aef38f35-d4d4-4b0b-8b45-62b4e9635c94',
          title: '',
          description: '',
          owner: 'Olivia Smith',
          location: 'Santorini',
          picture: '',
          country: 'Greece',
          hasWifi: false,
          hasTV: false,
          hasAC: false,
          hasSingleBed: false,
          hasDoubleBed: false,
          breakfastIncluded: false,
          rating: 9.2,
          pricingPerNight: 250,
          schedule: ''
        }}
      />
    )
    expect(() => screen.getByText('Free wifi')).toThrow()
    expect(() => screen.getByText('TV')).toThrow()
    expect(() => screen.getByText('Breakfast')).toThrow()
    expect(() => screen.getByText('Air Conditioner')).toThrow()
    expect(() => screen.getByText('Double bed')).toThrow()
    expect(() => screen.getByText('Single bed')).toThrow()
  })
})
