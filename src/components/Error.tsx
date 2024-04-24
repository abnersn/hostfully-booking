import type { ReactElement } from 'react'
import { FaArrowRotateRight } from 'react-icons/fa6'

export default function (): ReactElement {
  const handleRefreshClick = () => {
    location.reload()
  }
  return (
    <div className='grid place-items-center pt-4'>
      <header className='w-full max-w-screen-xl'>
        <h2 className='px-4 text-4xl text-white'>Sorry, an error ocurred</h2>
      </header>
      <main className='mx-auto w-full max-w-screen-xl'>
        <div className='flex w-full flex-col gap-2 p-4 text-lg text-white'>
          We're working to fix it asap!
          <button
            onClick={handleRefreshClick}
            className='mr-auto inline-flex items-center gap-1 rounded border border-white px-2 py-1 text-sm text-white hover:border-blue-200 hover:text-blue-200'
          >
            <FaArrowRotateRight /> Try again
          </button>
        </div>
      </main>
    </div>
  )
}
