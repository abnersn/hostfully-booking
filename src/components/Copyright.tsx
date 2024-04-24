import type { ReactElement } from 'react'
export default function (): ReactElement {
  return (
    <div className='grid place-items-center pt-4'>
      <footer className='text-white'>
        Copyright &#174; {new Date().getFullYear()} Hostfully Booking. All
        Rights Reserved
      </footer>
    </div>
  )
}
