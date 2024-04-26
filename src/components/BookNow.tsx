import moment from 'moment'
import {
  FormEvent,
  FormEventHandler,
  ReactElement,
  useEffect,
  useState
} from 'react'
import { FaCheck } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState, store } from 'redux-store'
import { selectAllBookingsForProperty } from 'redux-store/bookings'
import { IBooking, IProperty } from 'types'
import { v4 as uuid } from 'uuid'
import { dayDiff } from '../utils/booking'
import BookingDatepicker from './BookingDatepicker'

const formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'narrowSymbol'
})
function Pricing({ value }: { value: number }): ReactElement {
  return (
    <p className='flex flex-col'>
      <small>Only</small>
      <span>
        <strong className='text-2xl'>{formatter.format(value)}</strong>{' '}
        <small>per night</small>
      </span>
    </p>
  )
}

interface IBookNowProps {
  property: IProperty
  booking?: IBooking
}

// BookNow can both edit and create new bookings.
export default function BookNow({
  property,
  booking
}: IBookNowProps): ReactElement {
  const [startDate, setStartDate] = useState<Date | null>(
    booking?.startDate || null
  )
  const [endDate, setEndDate] = useState<Date | null>(booking?.endDate || null)
  const [status, setStatus] = useState<'idle' | 'added' | 'error'>('idle')

  const bookings = useSelector((state: RootState) =>
    selectAllBookingsForProperty(state, property.id)
  )

  useEffect(() => {
    if (!startDate || !endDate) {
      return
    }

    // Forbid same day
    if (dayDiff(startDate, endDate) === 0) {
      setStartDate(null)
      setEndDate(null)
    }
  }, [startDate, endDate])

  const handleSubmit: FormEventHandler = (ev: FormEvent) => {
    ev.preventDefault()
    if (!moment(startDate).isValid() || !moment(endDate).isValid()) {
      return
    }
    try {
      let action = booking
        ? {
            type: 'bookings/edit',
            payload: {
              oldBooking: booking,
              newBooking: {
                id: booking.id,
                propertyId: property.id,
                startDate: startDate?.toISOString(),
                endDate: endDate?.toISOString()
              }
            }
          }
        : {
            type: 'bookings/add',
            payload: {
              id: uuid(),
              propertyId: property.id,
              startDate: startDate?.toISOString(),
              endDate: endDate?.toISOString()
            }
          }
      store.dispatch(action)
      setStatus('added')
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  const handleTryAgain = () => {
    setStartDate(booking?.startDate || null)
    setEndDate(booking?.endDate || null)
    setStatus('idle')
  }

  let total = 0
  let diff = 0
  if (startDate && endDate) {
    diff = dayDiff(startDate, endDate)
    total = diff * property.pricingPerNight
  }

  if (status === 'error') {
    return (
      <div className='mt-auto flex flex-col bg-blue-900 p-4 text-white'>
        <h3 className='text-lg font-semibold'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full border border-red-500 text-red-500'>
            <FaXmark />
          </div>
          Error
        </h3>
        <p className='mb-2'>Property is not available for these dates.</p>
        <button
          onClick={handleTryAgain}
          className='ml-auto rounded-lg bg-blue-600 px-4 py-2 text-lg shadow-md hover:bg-blue-500 active:bg-blue-700 '
          type='submit'
        >
          Try again
        </button>
      </div>
    )
  }

  if (status === 'added') {
    return (
      <div className='mt-auto flex flex-col bg-blue-900 p-4 text-white'>
        <h3 className='text-lg font-semibold'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full border border-green-500 text-green-500'>
            <FaCheck />
          </div>
          Booking completed
        </h3>
        <p>
          From: <time>{moment(startDate).format('LL')}</time>
        </p>
        <p>
          To: <time>{moment(endDate).format('LL')}</time>
        </p>
        <hr className='my-2 border-blue-400' />
        <p>
          Total: {formatter.format(total)} · {diff}{' '}
          {diff > 1 ? 'nights' : 'night'}
        </p>
        <Link
          to='/'
          className='ml-auto rounded-lg bg-green-600 px-4 py-2 text-lg shadow-md hover:bg-green-500 active:bg-green-700 '
          type='submit'
        >
          Back to gallery
        </Link>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='mt-auto flex flex-col bg-blue-900 p-4 text-white'
    >
      <Pricing value={property.pricingPerNight} />
      <hr className='my-2 border-blue-400' />
      <div className='mb-1 flex w-full flex-col gap-2 md:flex-row'>
        <div className='flex-1'>
          <h3 className='mb-1'>Date</h3>
          <BookingDatepicker
            disabledDates={bookings.filter(b => b.id !== booking?.id)}
            propertyId={property.id}
            minDate={new Date()}
            startDate={startDate}
            endDate={endDate}
            onChange={(startDate, endDate) => {
              setStartDate(startDate)
              setEndDate(endDate)
            }}
          />
        </div>
      </div>
      <p
        className='text-sm'
        style={{
          visibility: total ? 'visible' : 'hidden'
        }}
      >{`Total for ${diff} ${diff > 1 ? 'nights' : 'night'}: ${formatter.format(total)}`}</p>
      {booking ? (
        <button
          disabled={!startDate || !endDate}
          className='ml-auto rounded-lg bg-blue-500 px-4 py-2 text-lg shadow-md hover:bg-blue-500 active:bg-blue-600 disabled:bg-gray-500'
          type='submit'
        >
          Save editions
        </button>
      ) : (
        <button
          disabled={!startDate || !endDate}
          className='ml-auto rounded-lg bg-orange-500 px-4 py-2 text-lg shadow-md hover:bg-yellow-500 active:bg-yellow-600 disabled:bg-gray-500'
          type='submit'
        >
          Book now!
        </button>
      )}
    </form>
  )
}
