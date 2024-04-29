import { screen } from '@testing-library/dom'
import { HttpResponse, http } from 'msw'
import PropertiesPage from 'pages/Properties'
import { renderWithProviderAndRouter } from 'testUtils'
import { ratingsFormatter } from 'utils'

const propertiesHasLoaded = async () =>
  screen.findByText(/Find the perfect accomodation/i)

describe('<Properties />', () => {
  it('shows loading state', async () => {
    renderWithProviderAndRouter(<PropertiesPage />)
    expect(screen.getByRole('heading')).toHaveTextContent(
      'Loading accomodations...'
    )
    await propertiesHasLoaded() // Waits to finish loading before moving on
  })
  it('shows refreshable error page', async () => {
    server.use(http.get('/mocks/properties.json', HttpResponse.error))
    renderWithProviderAndRouter(<PropertiesPage />)
    const heading = await screen.findByText('Sorry, an error occurred')
    expect(heading).toBeInTheDocument()

    // We cannot use window.reload from jest, so we must stub it
    const reload = vi.fn()
    vi.stubGlobal('location', { reload })

    // Test if refresh button calls window.location.reload
    const refreshButton = screen.getByText(/Try again/)
    refreshButton.click()
    expect(reload).toHaveBeenCalled()
  })
  it('renders titles', async () => {
    renderWithProviderAndRouter(<PropertiesPage />)
    await propertiesHasLoaded()

    for (const property of properties) {
      expect(screen.getByText(property.title)).toBeInTheDocument()
    }
  })
  it('shows location, country', async () => {
    renderWithProviderAndRouter(<PropertiesPage />)
    await propertiesHasLoaded()
    for (const property of properties) {
      expect(
        screen.getByText(`${property.location}, ${property.country}`)
      ).toBeInTheDocument()
    }
  })
  it('shows owner name', async () => {
    renderWithProviderAndRouter(<PropertiesPage />)
    await propertiesHasLoaded()
    for (const property of properties) {
      expect(screen.getByText(property.owner)).toBeInTheDocument()
    }
  })
  it('shows rating', async () => {
    renderWithProviderAndRouter(<PropertiesPage />)
    await propertiesHasLoaded()
    for (const property of properties) {
      expect(
        screen.getByText(ratingsFormatter.format(property.rating))
      ).toBeInTheDocument()
    }
  })
})
