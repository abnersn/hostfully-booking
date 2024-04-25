import { type ReactElement } from 'react'
import type { IconType } from 'react-icons'

export default function DescriptionTag({
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
