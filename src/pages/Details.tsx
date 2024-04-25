import DescriptionTag from 'components/DescriptionTag'
import Title from 'components/Title'
import { FormEvent, FormEventHandler, type ReactElement } from 'react'
import { IconType } from 'react-icons'
import { CgCoffee } from 'react-icons/cg'
import { FaMapMarkedAlt, FaRegSnowflake, FaUser, FaWifi } from 'react-icons/fa'
import { FaTv } from 'react-icons/fa6'
import { IoArrowBackOutline } from 'react-icons/io5'
import { LuBedDouble, LuBedSingle } from 'react-icons/lu'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectPropertyById } from 'redux-store/slices/properties'
import Datepicker from 'tailwind-datepicker-react'
import { IProperty } from 'types'
import { ratingsFormatter } from 'utils'
type IDetailsParams = {
  propertyId: string
}
function Amenity({
  Icon,
  label
}: {
  Icon: IconType
  label: string
}): ReactElement {
  return (
    <li className='flex min-w-20 flex-col items-center rounded border border-blue-900 px-2 py-1 text-blue-900'>
      <Icon className='text-xl' />
      <span>{label}</span>
    </li>
  )
}

function Amenities({ property }: { property: IProperty }): ReactElement | null {
  if (
    !property.hasWifi &&
    !property.breakfastIncluded &&
    !property.hasAC &&
    !property.hasTV &&
    !property.hasDoubleBed &&
    !property.hasSingleBed
  ) {
    return null
  }

  return (
    <>
      <h2 className='mb-1 mt-4 font-bold uppercase text-blue-900'>Amenities</h2>
      <ul className='flex flex-wrap gap-2'>
        {property.hasWifi && <Amenity Icon={FaWifi} label='Free wifi' />}
        {property.breakfastIncluded && (
          <Amenity Icon={CgCoffee} label='Breakfast' />
        )}
        {property.hasAC && (
          <Amenity Icon={FaRegSnowflake} label='Air Conditioner' />
        )}
        {property.hasTV && <Amenity Icon={FaTv} label='TV' />}
        {property.hasDoubleBed && (
          <Amenity Icon={LuBedDouble} label='Double bed' />
        )}
        {property.hasSingleBed && (
          <Amenity Icon={LuBedSingle} label='Single bed' />
        )}
      </ul>
    </>
  )
}

function Description({ property }: { property: IProperty }): ReactElement {
  return (
    <>
      <h2 className='mb-1 font-bold uppercase text-blue-900'>Description</h2>
      <p className='mb-2'>{property.description}</p>
    </>
  )
}

function Rating({ value }: { value: number }): ReactElement {
  return (
    <p className='grid-in-image mr-auto place-self-end rounded-tr-lg bg-blue-900 px-4 py-2 text-4xl font-bold text-white'>
      <span className='text-yellow-500'>&#9733;</span>{' '}
      <span>{ratingsFormatter.format(value)}</span>
    </p>
  )
}

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

function BookNow({ property }: { property: IProperty }): ReactElement {
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
          <Datepicker show={false} setShow={() => {}} />
        </div>
        <div className='flex-1'>
          <h3 className='mb-1'>End date</h3>
          <Datepicker show={false} setShow={() => {}} />
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

export default function Properties(): ReactElement {
  const { propertyId } = useParams<IDetailsParams>() as IDetailsParams

  const property = useSelector(selectPropertyById(propertyId))

  if (!property) {
    return <div>ok</div>
  }

  return (
    <div className='grid place-items-center pt-4'>
      <header className='w-full max-w-screen-xl'>
        <Title>
          <Link to='/'>
            <IoArrowBackOutline />
          </Link>{' '}
          {property.title}
        </Title>
      </header>
      <div className='mx-auto w-full max-w-screen-xl p-4'>
        <div className='box-border grid w-full grid-cols-1 grid-rows-[16rem_1fr] overflow-hidden rounded-lg bg-white shadow-lg md:h-44 md:grid-cols-[2fr_1fr] md:grid-rows-1'>
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
        </div>
      </div>
    </div>
  )
}
