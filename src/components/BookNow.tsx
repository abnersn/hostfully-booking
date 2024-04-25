import moment from 'moment'
import {
  FormEvent,
  FormEventHandler,
  ReactElement,
  useEffect,
  useState
} from 'react'
import { FaCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { store } from 'redux-store'
import { IProperty } from 'types'
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

export default function BookNow({
  property
}: {
  property: IProperty
}): ReactElement {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [status, setStatus] = useState<'idle' | 'added' | 'error'>('idle')

  useEffect(() => {
    if (!startDate || !endDate) {
      return
    }

    // Forbid same day
    if (moment(endDate).diff(startDate, 'hours') < 24) {
      setStartDate(null)
      setEndDate(null)
    }
  }, [startDate, endDate])

  const handleSubmit: FormEventHandler = (ev: FormEvent) => {
    ev.preventDefault()
    if (!moment(startDate).isValid() || !moment(endDate).isValid()) {
      return
    }
    store.dispatch({
      type: 'bookings/add',
      payload: {
        id: `${property.id}-${Date.now()}`,
        propertyId: property.id,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString()
      }
    })
    setStatus('added')
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

  let total = 0
  let diff = 0
  if (startDate && endDate) {
    diff = moment(endDate).diff(startDate, 'days')
    total = diff * property.pricingPerNight
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
      <button
        disabled={!startDate || !endDate}
        className='ml-auto rounded-lg bg-orange-500 px-4 py-2 text-lg shadow-md hover:bg-yellow-500 active:bg-yellow-600 disabled:bg-gray-500'
        type='submit'
      >
        Book now!
      </button>
    </form>
  )
}
