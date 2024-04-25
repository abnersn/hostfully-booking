import { FormEvent, FormEventHandler, ReactElement, useState } from 'react'

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

  const handleSubmit: FormEventHandler = (ev: FormEvent) => {
    ev.preventDefault()
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='mt-auto flex flex-col bg-blue-900 p-4 text-white'
    >
      <Pricing value={property.pricingPerNight} />
      <hr className='my-2 border-blue-400' />
      <div className='mb-4 flex w-full gap-2'>
        <div className='flex-1'>
          <h3 className='mb-1'>Start date</h3>
          <BookingDatepicker minDate={new Date()} onChange={setStartDate} />
        </div>
        <div className='flex-1'>
          <h3 className='mb-1'>End date</h3>
          <BookingDatepicker
            minDate={startDate || new Date()}
            onChange={setEndDate}
          />
        </div>
      </div>
      <button
        className='ml-auto rounded-lg bg-orange-500 px-4 py-2 text-lg shadow-md hover:bg-yellow-500 active:bg-yellow-600'
        type='submit'
      >
        Book now!
      </button>
    </form>
  )
}
