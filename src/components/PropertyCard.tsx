import moment from 'moment'
import { ReactElement } from 'react'
import { FaMapMarkedAlt, FaUser } from 'react-icons/fa'
import { store } from 'redux-store'
import { IBooking, IProperty } from 'types'
import { ratingsFormatter } from 'utils'
import Button from './Button'
import DescriptionTag from './DescriptionTag'
import LinkButton from './LinkButton'

interface IPropertyCardProps {
  property: IProperty
  booking?: IBooking
}

export default function PropertyCard(props: IPropertyCardProps): ReactElement {
  const { property, booking } = props

  const handleRemove = (): void => {
    if (!booking) {
      return
    }
    store.dispatch({
      type: 'bookings/remove',
      payload: booking?.id
    })
  }

  return (
    <article className='group flex h-full flex-col overflow-hidden rounded-md bg-white shadow-md hover:shadow-lg'>
      <img
        className='h-60 w-full object-cover group-hover:brightness-125'
        src={property.picture}
        alt={property.title}
      />
      <header className='flex flex-wrap gap-x-4 p-2 pb-1'>
        <h3 className='w-full text-xl font-bold text-blue-800'>
          {property.title}
        </h3>
        <address>
          <DescriptionTag
            Icon={FaMapMarkedAlt}
            label={`${property.location}, ${property.country}`}
          />
        </address>
        <DescriptionTag Icon={FaUser} label={property.owner} />
      </header>
      <div className='mt-auto flex justify-between px-2 pb-2'>
        {booking ? (
          <p>
            {moment(booking.startDate).format('LL')} ~{' '}
            {moment(booking.endDate).format('LL')}
          </p>
        ) : (
          <p className='font-bold'>
            <span className='text-yellow-500'>&#9733;</span>{' '}
            {ratingsFormatter.format(property.rating)}
          </p>
        )}
        <div className='flex gap-2'>
          {booking ? (
            <>
              <Button onClick={handleRemove} label='Remove' color='red' />
              <LinkButton to={`/properties/${property.id}`} label='Edit' />
            </>
          ) : (
            <LinkButton
              to={`/properties/${property.id}`}
              label='Check availability'
            />
          )}
        </div>
      </div>
    </article>
  )
}
