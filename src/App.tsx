import type { ReactElement } from 'react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Copyright from 'components/Copyright'
import Loader from 'components/Loader'
import { Provider } from 'react-redux'
import { store } from './redux-store'

const Properties = lazy(async () => import('pages/Properties'))
const Details = lazy(async () => import('pages/Details'))

export default function App(): ReactElement {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<Properties />} />
            <Route path=':property_id' element={<Details />} />
          </Routes>
        </Suspense>
        <Copyright />
      </BrowserRouter>
    </Provider>
  )
}
