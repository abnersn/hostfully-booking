import type { PropsWithChildren, ReactElement } from 'react'
export default function Header(props: PropsWithChildren): ReactElement {
  return <header className='w-full max-w-screen-xl'>{props.children}</header>
}
