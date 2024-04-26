import type { PropsWithChildren, ReactElement } from 'react'

export function Container(props: PropsWithChildren): ReactElement {
  return <div className='grid place-items-center pt-4'>{props.children}</div>
}

export function Main(props: PropsWithChildren): ReactElement {
  return (
    <main className='mx-auto w-full max-w-screen-xl'>{props.children}</main>
  )
}

export function Header(props: PropsWithChildren): ReactElement {
  return <header className='w-full max-w-screen-xl'>{props.children}</header>
}

export function Title(props: PropsWithChildren): ReactElement {
  return (
    <h2 className='flex items-center gap-4 px-4 text-2xl text-white md:text-4xl'>
      {props.children}
    </h2>
  )
}
