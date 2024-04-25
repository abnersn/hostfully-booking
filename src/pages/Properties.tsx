import DescriptionTag from 'components/DescriptionTag'
import Error from 'components/Error'
import LinkButton from 'components/LinkButton'
import Loader from 'components/Loader'
import Title from 'components/Title'
import { type ReactElement } from 'react'
import { FaMapMarkedAlt, FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import {
  selectProperties,
  selectPropertiesStatus
} from 'redux-store/slices/properties'
import type { IProperty } from 'types'

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
    <div className='grid place-items-center pt-4'>
      <header className='w-full max-w-screen-xl'>
        <Title>Find the perfect accomodation!</Title>
      </header>
      <main className='mx-auto w-full max-w-screen-xl'>
        <ul className='grid w-full grid-cols-auto-fill-400 grid-rows-2 gap-4 p-4'>
          {properties.map((p: IProperty) => (
            <li key={p.id}>
              <article className='group flex h-full flex-col overflow-hidden rounded-md bg-white shadow-md hover:shadow-lg'>
                <img
                  className='h-60 w-full object-cover group-hover:brightness-125'
                  src={p.picture}
                  alt={p.title}
                />
                <header className='flex flex-wrap gap-x-4 p-2 pb-1'>
                  <h3 className='w-full text-xl font-bold text-blue-800'>
                    {p.title}
                  </h3>
                  <address>
                    <DescriptionTag
                      Icon={FaMapMarkedAlt}
                      label={`${p.location}, ${p.country}`}
                    />
                  </address>
                  <DescriptionTag Icon={FaUser} label={p.owner} />
                </header>
                <div className='mt-auto flex px-2 pb-2'>
                  <p className='font-bold'>
                    <span className='text-yellow-500'>&#9733;</span> {p.rating}
                  </p>
                  <LinkButton
                    to={`/properties/${p.id}`}
                    label='Check availability'
                  />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
