import { render, waitFor } from '@testing-library/react'
import Properties from 'pages/Properties'
import type ReactRouterDOM from 'react-router-dom'
import { Navigate, Route, Routes } from 'react-router-dom'
import Details from '../Details'

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<typeof ReactRouterDOM>('react-router-dom')),
  Navigate: vi.fn()
}))

async function renderDetailsPage(route = 'apple'): Promise<void> {
  window.history.pushState({}, '', route)
  render(
    <Routes>
      <Route path='/' element={<Properties />} />
      <Route path=':property_id' element={<Details />} />
    </Routes>
  )
}

describe('<Details />', () => {
  it('redirect to home screen if property is not found', async () => {
    await renderDetailsPage('potato')

    await waitFor(() => expect(Navigate).toHaveBeenCalledTimes(1))
  })
  it('renders', async () => {
    await renderDetailsPage()

    expect(true).toBe(true)
  })
})
