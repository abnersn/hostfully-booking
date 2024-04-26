import BitArray from '@bitarray/es6'
import moment from 'moment'
import { IProperty } from 'types'

/**
 * Schedules are represented by binary strings, which then get converted to
 * a bit array.
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

function setBits(bitArray: BitArray, start: number, end: number, value: 1 | 0) {
  for (let i = start; i < end; i++) {
    bitArray[i] = value
  }
}

export function dayDiff(startDate: Date, endDate: Date) {
  if (moment(startDate).isSame(endDate, 'day')) {
    return 0
  }
  return Math.ceil(moment(endDate).diff(startDate, 'days', true))
}

export function placeBooking(
  property: IProperty,
  startDate: Date,
  endDate: Date
) {
  if (endDate < startDate || startDate < new Date()) {
    throw new Error('Invalid date')
  }
  const startIdx = dayDiff(new Date(), startDate)
  const diff = dayDiff(startDate, endDate)

  // Compute bit range for given dates
  const schedule = BitArray.from(property.schedule)
  const mask = BitArray.from('0'.repeat(property.schedule.length))
  setBits(mask, startIdx, startIdx + diff, 1)

  const intersects = schedule['&'](mask)
  if (intersects.count > 0) {
    throw new Error('Range is occupied.')
  }

  setBits(schedule, startIdx, startIdx + diff, 1)
  return Object.values(schedule).join('').trim()
}

export function removeBooking(
  property: IProperty,
  startDate: Date,
  endDate: Date
) {
  if (endDate < startDate || startDate < new Date()) {
    throw new Error('Invalid date')
  }
  const startIdx = dayDiff(new Date(), startDate)
  const diff = dayDiff(startDate, endDate)

  // Compute bit range for given dates
  const schedule = BitArray.from(property.schedule)
  setBits(schedule, startIdx, startIdx + diff + 1, 0)
  return Object.values(schedule).join('').trim()
}
