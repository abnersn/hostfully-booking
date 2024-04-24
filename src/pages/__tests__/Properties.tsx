import { screen } from '@testing-library/dom'
import PropertiesPage from 'pages/Properties'
import { renderWithProvider } from 'testUtils'

const propertiesHasLoaded = async () =>
  screen.findByText(/Find the perfect accomodation/i)

describe('<Properties />', () => {
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
