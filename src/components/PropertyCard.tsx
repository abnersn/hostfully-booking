import { ReactElement } from 'react'
import { FaMapMarkedAlt, FaUser } from 'react-icons/fa'
import { IProperty } from 'types'
import { ratingsFormatter } from 'utils'
import DescriptionTag from './DescriptionTag'
import LinkButton from './LinkButton'

export default function PropertyCard(props: IProperty): ReactElement {
  return (
    <article className='group flex h-full flex-col overflow-hidden rounded-md bg-white shadow-md hover:shadow-lg'>
      <img
        className='h-60 w-full object-cover group-hover:brightness-125'
        src={props.picture}
        alt={props.title}
      />
      <header className='flex flex-wrap gap-x-4 p-2 pb-1'>
        <h3 className='w-full text-xl font-bold text-blue-800'>
          {props.title}
        </h3>
        <address>
          <DescriptionTag
            Icon={FaMapMarkedAlt}
            label={`${props.location}, ${props.country}`}
          />
        </address>
        <DescriptionTag Icon={FaUser} label={props.owner} />
      </header>
      <div className='mt-auto flex px-2 pb-2'>
        <p className='font-bold'>
          <span className='text-yellow-500'>&#9733;</span>{' '}
          {ratingsFormatter.format(props.rating)}
        </p>
        <LinkButton to={`/properties/${props.id}`} label='Check availability' />
      </div>
    </article>
  )
}
