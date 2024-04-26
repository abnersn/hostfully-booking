import Error from 'components/Error'
import Loader from 'components/Loader'

import { type ReactElement } from 'react'
import { useSelector } from 'react-redux'
import {
  selectProperties,
  selectPropertiesStatus
} from 'redux-store/slices/properties'
import type { IProperty } from 'types'

import PropertyCard from 'components/PropertyCard'
import { Container, Header, Main, Title } from 'components/layout'

export default function Properties(): ReactElement {
  const properties = useSelector(selectProperties)
  const status = useSelector(selectPropertiesStatus)

  if (status === 'pending') {
    return <Loader />
  }

  if (status === 'error') {
    return <Error />
  }

  return (
    <Container>
      <Header>
        <Title>Find the perfect accomodation!</Title>
      </Header>
      <Main>
        <ul className='grid w-full grid-cols-auto-fill-400 grid-rows-2 gap-4 p-4'>
          {properties.map((p: IProperty) => (
            <li key={p.id}>
              <PropertyCard {...p} />
            </li>
          ))}
        </ul>
      </Main>
    </Container>
  )
}
