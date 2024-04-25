import { type ReactElement } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectPropertyById } from 'redux-store/slices/properties'

type IDetailsParams = {
  propertyId: string
}

export default function Properties(): ReactElement {
  const { propertyId } = useParams<IDetailsParams>() as IDetailsParams

  const property = useSelector(selectPropertyById(propertyId))

  if (!property) {
    return <div>ok</div>
  }

  return (
    <div className='grid place-items-center pt-4'>
      <header className='flex w-full max-w-screen-xl items-center gap-4 px-4 text-4xl text-white'>
        <Link to='/'>
          <IoArrowBackOutline />
        </Link>
        <h2>{property.title}</h2>
      </header>
      <main className='mx-auto w-full max-w-screen-xl'>
        <div className='grid-cols-[1fr 200px] m-4 grid h-80  w-full grid-rows-2 gap-4 rounded-lg bg-white p-4'></div>
      </main>
    </div>
  )
}
