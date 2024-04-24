import type { ReactElement } from 'react'
import { FaSpinner } from 'react-icons/fa'

function Skeleton(): ReactElement {
  return (
    <div className='grid h-60 w-full items-center justify-center rounded-lg bg-blue-400 text-3xl text-white'>
      <FaSpinner className='animate-spin' />
    </div>
  )
}

export default function (): ReactElement {
  return (
    <div className='grid place-items-center pt-4'>
      <header className='w-full max-w-screen-xl'>
        <h2 className='px-4 text-4xl text-white'>Loading accomodations...</h2>
      </header>
      <main className='mx-auto w-full max-w-screen-xl'>
        <ul className='grid-cols-auto-fill-400 grid w-full grid-rows-2 gap-4 p-4'>
          {new Array(6).fill(null).map((_, idx) => (
            <Skeleton key={idx} />
          ))}
        </ul>
      </main>
    </div>
  )
}
