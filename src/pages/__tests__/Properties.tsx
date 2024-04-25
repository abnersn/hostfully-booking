import { screen } from '@testing-library/dom'
import { HttpResponse, http } from 'msw'
import PropertiesPage from 'pages/Properties'
import type ReactRouterDOM from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { renderWithProvider } from 'testUtils'

// Mock navigation logic
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<typeof ReactRouterDOM>('react-router-dom')),
  Navigate: vi.fn()
}))

const propertiesHasLoaded = async () =>
  screen.findByText(/Find the perfect accomodation/i)

function renderPropertiesPage() {
  renderWithProvider(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PropertiesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

describe('<Properties />', () => {
  it('shows loading state', async () => {
    renderPropertiesPage()
    expect(screen.getByRole('heading')).toHaveTextContent(
      'Loading accomodations...'
    )
    await propertiesHasLoaded() // Waits to finish loading before moving on
  })
  it('shows refreshable error page', async () => {
    server.use(http.get('/public/mocks/properties.json', HttpResponse.error))
    renderPropertiesPage()
    const heading = await screen.findByText('Sorry, an error occurred')
    expect(heading).toBeInTheDocument()

    const refreshButton = screen.getByText(/Try again/)
    refreshButton.click()
  })
  it('renders titles', async () => {
    renderPropertiesPage()
    await propertiesHasLoaded()

    for (const property of properties) {
      expect(screen.getByText(property.title)).toBeInTheDocument()
    }
  })
  it('shows location, country', async () => {
    renderPropertiesPage()
    await propertiesHasLoaded()
    for (const property of properties) {
      expect(
        screen.getByText(`${property.location}, ${property.country}`)
      ).toBeInTheDocument()
    }
  })
  it('shows owner name', async () => {
    renderPropertiesPage()
    await propertiesHasLoaded()
    for (const property of properties) {
      expect(screen.getByText(property.owner)).toBeInTheDocument()
    }
  })
  it('shows rating', async () => {
    renderPropertiesPage()
    await propertiesHasLoaded()
    for (const property of properties) {
      expect(screen.getByText(property.rating)).toBeInTheDocument()
    }
  })
})
