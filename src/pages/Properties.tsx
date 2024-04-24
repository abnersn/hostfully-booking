import Error from 'components/Error'
import LinkButton from 'components/LinkButton'
import Loader from 'components/Loader'
import { useEffect, type ReactElement } from 'react'
import type { IconType } from 'react-icons'
import { FaMapMarkedAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProperties,
  selectProperties,
  selectPropertiesStatus
} from 'redux-store/slices/properties'
import type { IProperty } from 'types'

function DescriptionTag({
  Icon,
  label
}: {
  Icon: IconType
  label: string
}): ReactElement {
  return (
    <div className='inline-flex items-center gap-1'>
      <Icon className='text-sm' />
      <span>{label}</span>
    </div>
  )
}

export default function Properties(): ReactElement {
  const properties = useSelector(selectProperties)
  const status = useSelector(selectPropertiesStatus)

  const dispatch = useDispatch<any>()

  // Fetches array of properties
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProperties())
    }
  }, [status])

  if (status === 'pending') {
    return <Loader />
  }

  if (status === 'error') {
    return <Error />
  }

  return (
    <div className='grid place-items-center pt-4'>
      <header className='w-full max-w-screen-xl'>
        <h2 className='px-4 text-4xl text-white'>
          Find the perfect accomodation!
        </h2>
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
                  <LinkButton to={`/${p.id}`} label='Check availability' />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
