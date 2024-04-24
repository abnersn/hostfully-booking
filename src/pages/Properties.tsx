import type { ReactElement } from 'react'
import { IconType } from 'react-icons'
import { FaMapMarkedAlt, FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectProperties } from 'redux-store/slices/properties'
import { IProperty } from 'types'

function DescriptionTag(props: {
  Icon: IconType
  label: string
}): ReactElement {
  return (
    <div className='inline-flex items-baseline gap-1'>
      <props.Icon className='text-sm' />
      <span>{props.label}</span>
    </div>
  )
}

export default function Properties(): ReactElement {
  const properties = useSelector(selectProperties)
  return (
    <div className='grid place-items-center pt-4'>
      <header className='w-full max-w-screen-xl'>
        <h2 className='px-4 text-4xl text-white'>
          Find the <strong>perfect</strong> accomodation!
        </h2>
      </header>
      <main className='mx-auto w-full max-w-screen-xl'>
        <ul className='grid-cols-auto-fill-400 grid w-full grid-rows-2 gap-4 p-4'>
          {properties.map((p: IProperty) => (
            <li key={p.id}>
              <article className='flex h-full flex-col overflow-hidden rounded-md bg-white shadow-md hover:shadow-lg'>
                <img
                  className='h-60 w-full object-cover'
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
                  <Link
                    className='ml-auto inline-block rounded border border-blue-800 bg-white px-2 py-1 text-sm text-blue-800 hover:border-blue-500 hover:text-blue-500 hover:outline-2'
                    to={`/${p.id}`}
                  >
                    Check availability
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </main>
      <footer className='text-white'>
        Copyright &#174; {new Date().getFullYear()} Hostfully Booking. All
        Rights Reserved
      </footer>
    </div>
  )
}
