import BitSet from 'bitset'
import moment from 'moment'
import { bookProperty, removeBooking } from 'utils/booking'

const makeProperty = () => {
  return {
    id: 'aef38f35-d4d4-4b0b-8b45-62b4e9635c94',
    title: 'Mountain Retreat with Stunning Views',
    description:
      'Escape to this secluded mountain retreat and immerse yourself in nature. Wake up to breathtaking views of rolling hills and distant peaks. Enjoy hiking trails, cozy evenings by the fireplace, and stargazing from the hot tub.',
    owner: 'Olivia Smith',
    location: 'Santorini',
    picture:
      'https://images.unsplash.com/photo-1517926967795-31943e805dae?fit=crop&q=60&auto=format',
    country: 'Greece',
    hasWifi: true,
    hasTV: true,
    hasAC: false,
    hasSingleBed: false,
    hasDoubleBed: true,
    breakfastIncluded: false,
    rating: 9.2,
    pricingPerNight: 250,
    schedule: '0'.repeat(1000)
  }
}

describe('bookProperty', () => {
  it('refuses dates prior to today', () => {
    const property = makeProperty()
    const startDate = moment().add(-1, 'day').toDate()
    const endDate = moment().add(10, 'day').toDate()
    expect(() => {
      bookProperty(property, startDate, endDate)
    }).toThrow()
  })
  it('refuses endDate after startDate', () => {
    const property = makeProperty()
    const startDate = moment().add(10, 'day').toDate()
    const endDate = moment().add(-1, 'day').toDate()
    expect(() => {
      bookProperty(property, startDate, endDate)
    }).toThrow()
  })
  it('books for N days', () => {
    const property = makeProperty()
    const startMoment = moment()
    const endMoment = moment().add(15, 'days')
    const newSchedule = bookProperty(
      property,
      startMoment.toDate(),
      endMoment.toDate()
    )
    expect(new BitSet(newSchedule).cardinality()).toBe(15)
  })
  it('refuses overlapping bookings', () => {
    const property = makeProperty()

    property.schedule = bookProperty(
      property,
      moment().add(15, 'days').toDate(),
      moment().add(45, 'days').toDate()
    )

    // Overlapping from the left
    expect(() => {
      bookProperty(
        property,
        moment().add(5, 'days').toDate(),
        moment().add(45, 'days').toDate()
      )
    }).toThrow()

    // Overlapping from the right
    expect(() => {
      bookProperty(
        property,
        moment().add(20, 'days').toDate(),
        moment().add(60, 'days').toDate()
      )
    }).toThrow()

    // Overlapping from inside
    expect(() => {
      bookProperty(
        property,
        moment().add(20, 'days').toDate(),
        moment().add(30, 'days').toDate()
      )
    }).toThrow()

    // Overlapping from outside
    expect(() => {
      bookProperty(
        property,
        moment().add(1, 'days').toDate(),
        moment().add(60, 'days').toDate()
      )
    }).toThrow()
  })
})

describe('removeBooking', () => {
  it('clears a date range', () => {
    const property = makeProperty()

    const startDate = moment().add(15, 'days').toDate()
    const endDate = moment().add(45, 'days').toDate()
    property.schedule = bookProperty(property, startDate, endDate)

    property.schedule = removeBooking(property, startDate, endDate)

    expect(() => {
      bookProperty(property, startDate, endDate)
    }).not.toThrow()
  })
})