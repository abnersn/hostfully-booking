import Error from 'components/Error'
import Loader from 'components/Loader'

import { type ReactElement } from 'react'
import { useSelector } from 'react-redux'
import {
  selectProperties,
  selectPropertiesStatus
} from 'redux-store/properties'
import type { IBooking, IProperty } from 'types'

import LinkButton from 'components/LinkButton'
import PropertyCard from 'components/PropertyCard'
import { Container, Header, Main, Title } from 'components/layout'
import { IoArrowBackOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { selectBookings } from 'redux-store/bookings'

export default function MyBookings(): ReactElement {
  const properties = useSelector(selectProperties)
  const bookings = useSelector(selectBookings)
  const status = useSelector(selectPropertiesStatus)
  const propertiesById: { [key: string]: IProperty } = {}
  for (const p of properties) {
    propertiesById[p.id] = p
  }

  if (status === 'pending') {
    return <Loader />
  }

  if (status === 'error') {
    return <Error />
  }

  return (
    <Container>
      <Header>
        <Title>
          {bookings.length > 0 && (
            <Link to='/'>
              <IoArrowBackOutline />
            </Link>
          )}
          My Bookings
        </Title>
      </Header>
      <Main>
        {bookings.length > 0 ? (
          <ul className='grid w-full grid-cols-auto-fill-400 grid-rows-2 gap-4 p-4'>
            {bookings.map((b: IBooking) => (
              <li key={b.id}>
                <PropertyCard
                  property={propertiesById[b.propertyId]}
                  booking={b}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className='h-44 p-4 text-white'>
            <p className='mb-2'>Looks like you haven't booked anything yet.</p>
            <LinkButton
              label='Check out accomodations'
              variant='white'
              to='/'
            />
          </div>
        )}
      </Main>
    </Container>
  )
}
