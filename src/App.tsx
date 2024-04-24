import type { ReactElement } from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Copyright from 'components/Copyright'
import Error from 'components/Error'
import Loader from 'components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProperties } from 'redux-store/slices/properties'
import { RootState } from './redux-store'

import Details from 'pages/Details'
import Properties from 'pages/Properties'

function AppScreen(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Properties />} />
        <Route path=':property_id' element={<Details />} />
      </Routes>
    </BrowserRouter>
  )
}

export default function App(): ReactElement {
  const propertiesStatus = useSelector(
    (state: RootState) => state.properties.status
  )
  const dispatch = useDispatch<any>()

  // Fetches array of properties
  useEffect(() => {
    if (propertiesStatus === 'idle') {
      dispatch(fetchProperties())
    }
  }, [propertiesStatus])

  if (propertiesStatus === 'error') {
    return <Error />
  }
  return (
    <>
      {propertiesStatus === 'success' ? <AppScreen /> : <Loader />}
      <Copyright />
    </>
  )
}
