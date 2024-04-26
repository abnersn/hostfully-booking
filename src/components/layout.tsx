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
  return (
    <header className='flex w-full max-w-screen-xl flex-wrap items-end justify-between gap-2 px-4'>
      {props.children}
    </header>
  )
}

export function Title(props: PropsWithChildren): ReactElement {
  return (
    <h2 className='flex items-center gap-4 text-2xl text-white md:text-4xl'>
      {props.children}
    </h2>
  )
}

export function DetailsContainer(props: PropsWithChildren): ReactElement {
  return (
    <div className='box-border grid w-full grid-cols-1 grid-rows-[16rem_1fr] overflow-hidden rounded-lg bg-white shadow-lg md:h-44 md:grid-rows-1 lg:grid-cols-[2fr_1fr]'>
      {props.children}
    </div>
  )
}
