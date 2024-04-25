import type { ReactElement } from 'react'
import { FaSpinner } from 'react-icons/fa'
import Title from './Title'

function Skeleton(): ReactElement {
  return (
    <div className='grid h-80 w-full items-center justify-center rounded-lg bg-blue-400 text-3xl text-white'>
      <FaSpinner className='animate-spin' />
    </div>
  )
}

export default function (): ReactElement {
  return (
    <div className='grid place-items-center pt-4'>
      <header className='w-full max-w-screen-xl'>
        <Title>Loading accomodations...</Title>
      </header>
      <main className='mx-auto w-full max-w-screen-xl'>
        <ul className='grid w-full grid-cols-auto-fill-400 grid-rows-2 gap-4 p-4'>
          {new Array(6).fill(null).map((_, idx) => (
            <Skeleton key={idx} />
          ))}
        </ul>
      </main>
    </div>
  )
}
