import Property from 'classes/Property'
import moment from 'moment'
import { IProperty } from 'types'

const sampleProperty: IProperty = {
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
  pricingPerNight: 250
}

describe('Property', () => {
  it('refuses dates prior to today', () => {
    const property = new Property(sampleProperty)
    const startDate = moment().add(-1, 'day').toDate()
    const endDate = moment().add(10, 'day').toDate()
    expect(() => {
      property.book(startDate, endDate)
    }).toThrow()
  })
  it('refuses endDate after startDate', () => {
    const property = new Property(sampleProperty)
    const startDate = moment().add(10, 'day').toDate()
    const endDate = moment().add(-1, 'day').toDate()
    expect(() => {
      property.book(startDate, endDate)
    }).toThrow()
  })
  it('books between today and the last day of the next 3 years', () => {
    const property = new Property(sampleProperty)
    const startMoment = moment()
    const endMoment = moment().add(3, 'year').endOf('year')
    expect(() => {
      property.book(startMoment.toDate(), endMoment.toDate())
    }).not.toThrow()

    const expectedCardinality = endMoment.diff(startMoment, 'days')
    expect(property.schedule.cardinality()).toBe(expectedCardinality)
  })
  it('books for N days', () => {
    const property = new Property(sampleProperty)
    const startMoment = moment()
    const endMoment = moment().add(15, 'days')
    property.book(startMoment.toDate(), endMoment.toDate())
    expect(property.schedule.cardinality()).toBe(15)
  })
  it('refuses overlapping bookings', () => {
    const property = new Property(sampleProperty)

    property.book(
      moment().add(15, 'days').toDate(),
      moment().add(45, 'days').toDate()
    )

    // Overlapping from the left
    expect(() => {
      property.book(
        moment().add(5, 'days').toDate(),
        moment().add(45, 'days').toDate()
      )
    }).toThrow()

    // Overlapping from the right
    expect(() => {
      property.book(
        moment().add(20, 'days').toDate(),
        moment().add(60, 'days').toDate()
      )
    }).toThrow()

    // Overlapping from inside
    expect(() => {
      property.book(
        moment().add(20, 'days').toDate(),
        moment().add(30, 'days').toDate()
      )
    }).toThrow()

    // Overlapping from outside
    expect(() => {
      property.book(
        moment().add(1, 'days').toDate(),
        moment().add(60, 'days').toDate()
      )
    }).toThrow()
  })
})
