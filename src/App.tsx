import type { ReactElement } from 'react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Properties = lazy(async () => import('pages/Properties'))
const Details = lazy(async () => import('pages/Details'))

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Failed!</h1>}>
        <Routes>
          <Route path='/' element={<Properties />} />
          <Route path=':property_id' element={<Details />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
