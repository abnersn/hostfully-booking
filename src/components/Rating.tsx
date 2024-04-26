import type { ReactElement } from 'react'
import { ratingsFormatter } from 'utils'
type IDetailsParams = {
  propertyId: string
}

export default function Rating({ value }: { value: number }): ReactElement {
  return (
    <p className='grid-in-image mr-auto place-self-end rounded-tr-lg bg-blue-900 px-4 py-2 text-4xl font-bold text-white'>
      <span className='text-yellow-500'>&#9733;</span>{' '}
      <span>{ratingsFormatter.format(value)}</span>
    </p>
  )
}
