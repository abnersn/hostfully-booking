import { useEffect, type ReactElement } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Copyright from 'components/Copyright'

import NotFound from 'components/NotFound'
import Details from 'pages/Details'
import EditBooking from 'pages/EditBooking'
import MyBookings from 'pages/MyBookings'
import Properties from 'pages/Properties'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProperties, selectPropertiesStatus } from 'redux-store/properties'

export default function App(): ReactElement {
  const dispatch = useDispatch<any>()
  const propertiesStatus = useSelector(selectPropertiesStatus)

  // Fetches array of properties
  useEffect(() => {
    if (propertiesStatus === 'idle') {
      dispatch(fetchProperties())
    }
  }, [propertiesStatus])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Properties />} />
          <Route path='/myBookings' element={<MyBookings />} />
          <Route path='/myBookings/:bookingId' element={<EditBooking />} />
          <Route path='/properties/:propertyId' element={<Details />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Copyright />
    </>
  )
}
