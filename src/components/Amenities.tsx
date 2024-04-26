import type { ReactElement } from 'react'
import { IconType } from 'react-icons'
import { CgCoffee } from 'react-icons/cg'
import { FaRegSnowflake, FaWifi } from 'react-icons/fa'
import { FaTv } from 'react-icons/fa6'
import { LuBedDouble, LuBedSingle } from 'react-icons/lu'
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

export default function Amenities({
  property
}: {
  property: IProperty
}): ReactElement | null {
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
