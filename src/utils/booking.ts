import BitSet from 'bitset'
import moment from 'moment'
import { IProperty } from 'types'

/**
 * Schedules are represented by binary strings, which then get converted to
 * BitSet.
 *
 * Each bit in the schedule represents the next 1000 days, 1 for occupied days
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

export function placeBooking(
  property: IProperty,
  startDate: Date,
  endDate: Date
) {
  if (endDate < startDate || startDate < new Date()) {
    throw new Error('Invalid date')
  }
  const diff = moment(endDate).diff(startDate, 'days')
  const startDateIndex = moment(startDate).dayOfYear()

  // Compute bit range for given dates
  const schedule = new BitSet(property.schedule)
  const range = new BitSet('0'.repeat(property.schedule.length))
  range.setRange(startDateIndex, startDateIndex + diff - 1, 1)

  const intersects = schedule.and(range)
  if (!intersects.isEmpty()) {
    throw new Error('Range is occupied.')
  }

  schedule.setRange(startDateIndex, startDateIndex + diff - 1, 1)
  return schedule.toString()
}

export function removeBooking(
  property: IProperty,
  startDate: Date,
  endDate: Date
) {
  if (endDate < startDate || startDate < new Date()) {
    throw new Error('Invalid date')
  }
  const diff = moment(endDate).diff(startDate, 'days')
  const startDateIndex = moment(startDate).dayOfYear()

  // Compute bit range for given dates
  const schedule = new BitSet(property.schedule)
  schedule.setRange(startDateIndex, startDateIndex + diff - 1, 0)
  return schedule.toString()
}
