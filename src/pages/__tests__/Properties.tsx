import { screen } from '@testing-library/dom'
import { HttpResponse, http } from 'msw'
import PropertiesPage from 'pages/Properties'
import { store } from 'redux-store'
import { renderWithProvider } from 'testUtils'

const propertiesHasLoaded = async () =>
  screen.findByText(/Find the perfect accomodation/i)

describe('<Properties />', () => {
  it('shows loading state', async () => {
    renderWithProvider(<PropertiesPage />)
    expect(screen.getByRole('heading')).toHaveTextContent(
      'Loading accomodations...'
    )
  })
  it('shows error page', async () => {
    server.use(
      http.get(
        '/public/mocks/properties.json',
        () =>
          new HttpResponse('Not found', {
            status: 404
          })
      )
    )
    renderWithProvider(<PropertiesPage />)
    const heading = await screen.findByText('Sorry, an error occurred')
    console.log(store.getState())
    expect(heading).toBeInTheDocument()
  })
  it('renders titles', async () => {
    renderWithProvider(<PropertiesPage />)
    await propertiesHasLoaded()
    for (const property of properties) {
      expect(screen.getByText(property.title)).toBeInTheDocument()
    }
  })
  it('shows location, country', async () => {
    renderWithProvider(<PropertiesPage />)
    await propertiesHasLoaded()
    for (const property of properties) {
      expect(
        screen.getByText(`${property.location}, ${property.country}`)
      ).toBeInTheDocument()
    }
  })
  it('shows owner name', async () => {
    renderWithProvider(<PropertiesPage />)
    await propertiesHasLoaded()
    for (const property of properties) {
      expect(screen.getByText(property.owner)).toBeInTheDocument()
    }
  })
  it('shows rating', async () => {
    renderWithProvider(<PropertiesPage />)
    await propertiesHasLoaded()
    for (const property of properties) {
      expect(screen.getByText(property.rating)).toBeInTheDocument()
    }
  })
})
