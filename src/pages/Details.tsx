import DescriptionTag from 'components/DescriptionTag'
import { type ReactElement } from 'react'
import { IconType } from 'react-icons'
import { CgCoffee } from 'react-icons/cg'
import { FaMapMarkedAlt, FaRegSnowflake, FaUser, FaWifi } from 'react-icons/fa'
import { FaTv } from 'react-icons/fa6'
import { IoArrowBackOutline } from 'react-icons/io5'
import { LuBedDouble, LuBedSingle } from 'react-icons/lu'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectPropertyById } from 'redux-store/slices/properties'
import { IProperty } from 'types'

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
      <span className='text-yellow-500'>&#9733;</span> <span>{value}</span>
    </p>
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
      <header className='flex w-full max-w-screen-xl items-center gap-4 px-4 text-4xl text-white'>
        <Link to='/'>
          <IoArrowBackOutline />
        </Link>
        <h2>{property.title}</h2>
      </header>
      <div className='mx-auto w-full max-w-screen-xl p-4'>
        <div className='box-border grid h-44  w-full grid-cols-[2fr_1fr] grid-rows-1 overflow-hidden rounded-lg bg-white shadow-lg'>
          <aside className='grid-areas-image grid grid-rows-1'>
            <img
              className='grid-in-image h-full w-full object-cover'
              src={property.picture}
              alt={property.title}
            />
            <Rating value={property.rating} />
          </aside>
          <main className='p-4'>
            <div className='mb-2 flex gap-4'>
              <DescriptionTag
                Icon={FaMapMarkedAlt}
                label={`${property.location}, ${property.country}`}
              />
              <DescriptionTag Icon={FaUser} label={property.owner} />
            </div>
            <Description property={property} />
            <Amenities property={property} />
          </main>
        </div>
      </div>
    </div>
  )
}
