import moment from 'moment'
import {
  FormEvent,
  FormEventHandler,
  ReactElement,
  useEffect,
  useState
} from 'react'
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
    setEndDate(startDate ? moment(startDate).add(1, 'day').toDate() : null)
  }, [startDate])
  const handleSubmit: FormEventHandler = (ev: FormEvent) => {
    ev.preventDefault()
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
          <h3 className='mb-1'>Start date</h3>
          <BookingDatepicker
            minDate={new Date()}
            value={startDate}
            onChange={setStartDate}
          />
        </div>
        <div className='flex-1'>
          <h3 className='mb-1'>End date</h3>
          <BookingDatepicker
            minDate={moment(startDate).add(1, 'day').toDate() || new Date()}
            value={endDate}
            onChange={setEndDate}
          />
        </div>
      </div>
      <p
        className='text-sm'
        style={{
          visibility: total ? 'visible' : 'hidden'
        }}
      >{`Total for ${diff} ${diff > 1 ? 'night' : 'night'}: ${formatter.format(total)}`}</p>
      <button
        className='ml-auto rounded-lg bg-orange-500 px-4 py-2 text-lg shadow-md hover:bg-yellow-500 active:bg-yellow-600'
        type='submit'
      >
        Book now!
      </button>
    </form>
  )
}
