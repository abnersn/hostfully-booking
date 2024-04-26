import { type ReactElement } from 'react'
import type { IconType } from 'react-icons'
import { IProperty } from 'types'

export function DescriptionTag({
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

export function Description({
  property
}: {
  property: IProperty
}): ReactElement {
  return (
    <>
      <h2 className='mb-1 font-bold uppercase text-blue-900'>Description</h2>
      <p className='mb-2'>{property.description}</p>
    </>
  )
}
