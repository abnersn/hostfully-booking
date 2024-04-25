import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

interface ILinkButtonProps {
  label: string
  to: string
  variant?: 'white' | 'blue'
}

export default function ({
  label,
  to,
  variant = 'blue'
}: ILinkButtonProps): ReactElement {
  let colorClasses =
    'border-blue-800 text-blue-800 hover:border-blue-500 hover:text-blue-500 active:bg-blue-50'
  if (variant === 'white') {
    colorClasses =
      'border-white text-white hover:border-blue-200 hover:text-blue-200 active:bg-blue-500 active:text-blue-900 active:border-blue-900'
  }
  return (
    <Link
      className={`ml-auto inline-block rounded border  px-2 py-1 text-sm ${colorClasses}`}
      to={to}
    >
      {label}
    </Link>
  )
}
