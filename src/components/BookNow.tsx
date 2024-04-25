import moment from 'moment'
import {
  FormEvent,
  FormEventHandler,
  ReactElement,
  useEffect,
  useState
} from 'react'
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
    if (!startDate || !endDate) {
      return
    }
    store.dispatch({
      type: 'booking/add',
      payload: {
        property,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    })
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
