import Amenities from 'components/Amenities'
import BookNow from 'components/BookNow'
import { Description, DescriptionTag } from 'components/Description'
import Error from 'components/Error'
import Loader from 'components/Loader'
import NotFound from 'components/NotFound'
import Rating from 'components/Rating'
import { Container, DetailsContainer, Header, Title } from 'components/layout'
import type { ReactElement } from 'react'
import { FaMapMarkedAlt, FaUser } from 'react-icons/fa'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { RootState } from 'redux-store'
import {
  selectPropertiesStatus,
  selectPropertyById
} from 'redux-store/properties'
type IDetailsParams = {
  propertyId: string
}

export default function Details(): ReactElement {
  const { propertyId } = useParams<IDetailsParams>() as IDetailsParams

  const property = useSelector((state: RootState) =>
    selectPropertyById(state, propertyId)
  )
  const status = useSelector(selectPropertiesStatus)

  if (status === 'error') {
    return <Error />
  }

  if (status === 'pending') {
    return <Loader />
  }

  if (!property) {
    return <NotFound />
  }

  return (
    <Container>
      <Header>
        <Title>
          <Link to='/'>
            <IoArrowBackOutline />
          </Link>{' '}
          {property.title}
        </Title>
      </Header>
      <div className='mx-auto w-full max-w-screen-xl p-4'>
        <DetailsContainer>
          <aside className='grid-areas-image grid grid-rows-1'>
            <img
              className='grid-in-image h-full w-full object-cover'
              src={property.picture}
              alt={property.title}
            />
            <Rating value={property.rating} />
          </aside>
          <main className='flex flex-col'>
            <div className='p-4'>
              <div className='mb-2 flex gap-4'>
                <DescriptionTag
                  Icon={FaMapMarkedAlt}
                  label={`${property.location}, ${property.country}`}
                />
                <DescriptionTag Icon={FaUser} label={property.owner} />
              </div>
              <Description property={property} />
              <Amenities property={property} />
            </div>
            <BookNow property={property} />
          </main>
        </DetailsContainer>
      </div>
    </Container>
  )
}
