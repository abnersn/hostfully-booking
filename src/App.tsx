import type { ReactElement } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Copyright from 'components/Copyright'

import Details from 'pages/Details'
import Properties from 'pages/Properties'

export default function App(): ReactElement {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Properties />} />
          <Route path=':property_id' element={<Details />} />
        </Routes>
      </BrowserRouter>
      <Copyright />
    </>
  )
}
