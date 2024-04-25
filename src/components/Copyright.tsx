import type { ReactElement } from 'react'
export default function (): ReactElement {
  return (
    <div className='box-border grid w-full place-items-center p-4 text-center'>
      <footer className='text-white'>
        Copyright &#174; {new Date().getFullYear()} Hostfully Booking. All
        Rights Reserved
      </footer>
    </div>
  )
}
