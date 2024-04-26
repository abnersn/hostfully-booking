import type { ReactElement, ReactNode } from 'react'

interface IButtonProps {
  icon?: ReactNode
  label: string
  color?: 'red' | 'blue'
  onClick: () => void
}

export default function ({
  icon,
  color = 'blue',
  label,
  onClick
}: IButtonProps): ReactElement {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded border px-2 py-1 text-sm border-${color}-800 text-${color}-800 hover:border-${color}-500 hover:text-${color}-500 active:bg-${color}-50`}
    >
      {icon}
      {label}
    </button>
  )
}
