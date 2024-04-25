import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export default function (props: { label: string; to: string }): ReactElement {
  return (
    <Link
      className='ml-auto inline-block rounded border border-blue-800  px-2 py-1 text-sm text-blue-800 hover:border-blue-500 hover:text-blue-500 hover:outline-2 active:bg-blue-50'
      to={props.to}
    >
      {props.label}
    </Link>
  )
}
