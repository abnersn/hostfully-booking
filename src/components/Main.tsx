import type { PropsWithChildren, ReactElement } from 'react'
export default function Main(props: PropsWithChildren): ReactElement {
  return (
    <main className='mx-auto w-full max-w-screen-xl'>{props.children}</main>
  )
}
