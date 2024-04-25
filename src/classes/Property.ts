import BitSet from 'bitset'
import _ from 'lodash'
import moment from 'moment'
import { IProperty } from 'types'

/**
 * This class implements a Property, which contains a schedule represented by
 * a binary string (BitSet)
 *
 * Each bit in the schedule represents a day of the year, 1 for occupied days
 * and 0 for free days. By choosing this model, we're able to compute
 * booking availability for any date ranges with a simple logic AND operation.
 *
 * For exmple, given a schedule for the next 10 days in which the last 4 days
 * are already booked.
 * schedule = 0000001111
 *
 * If we try to book a date range that overlaps the schedule, for example:
 * range = 0001111110
 *
 * The logic AND between schedule and range should result in a non-zero bit
 * string: 0000001110, indicating that the range intersects with
 * a pre-existent booking.
 */

export default class Property {
  title: string
  id: string
  description: string
  owner: string
  location: string
  picture: string
  country: string
  hasWifi: boolean
  hasTV: boolean
  hasAC: boolean
  hasDoubleBed: boolean
  hasSingleBed: boolean

  schedule: BitSet

  constructor(attributes: IProperty) {
    this.title = attributes.title
    this.id = attributes.id
    this.description = attributes.description
    this.owner = attributes.owner
    this.location = attributes.location
    this.picture = attributes.picture
    this.country = attributes.country
    this.hasWifi = attributes.hasWifi
    this.hasTV = attributes.hasTV
    this.hasAC = attributes.hasAC
    this.hasDoubleBed = attributes.hasDoubleBed
    this.hasSingleBed = attributes.hasSingleBed

    // Compute the length for the bitset, from the first day of the current year
    // to the last day of the next 3 years.
    const scheduleLength = _.range(4).reduce((acc, i) => {
      const year = moment().add(i, 'year').year()
      const yearLength = moment().year(year).endOf('year').dayOfYear()
      acc += yearLength
      return acc
    }, 0)
    this.schedule = new BitSet('0'.repeat(scheduleLength))
  }

  book(startDate: Date, endDate: Date) {
    if (endDate < startDate || startDate < new Date()) {
      throw new Error('Invalid date')
    }
    const diff = moment(endDate).diff(startDate, 'days')
    const startDateIndex = moment(startDate).dayOfYear()

    // Compute bit range for given dates
    const range = this.schedule.clone()
    range.setRange(startDateIndex, startDateIndex + diff - 1, 1)

    const intersects = this.schedule.and(range)
    if (!intersects.isEmpty()) {
      throw new Error('Range is occupied.')
    }

    this.schedule.setRange(startDateIndex, startDateIndex + diff - 1, 1)
  }
}
