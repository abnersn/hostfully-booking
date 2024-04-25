import { PropsWithChildren, ReactElement } from 'react'

export default function Title(props: PropsWithChildren): ReactElement {
  return (
    <h2 className='flex items-center gap-4 px-4 text-xl text-white md:text-4xl'>
      {props.children}
    </h2>
  )
}
