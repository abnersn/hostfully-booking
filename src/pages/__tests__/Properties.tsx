import { screen } from '@testing-library/dom'
import PropertiesPage from 'pages/Properties'
import properties from '../../mocks/properties.json'

import { renderWithProvider } from 'testUtils'

describe('<Properties />', () => {
  it('renders titles', async () => {
    renderWithProvider(<PropertiesPage />)
    for (const property of properties) {
      expect(screen.getByText(property.title)).toBeInTheDocument()
    }
  })
  it('shows location, country', async () => {
    renderWithProvider(<PropertiesPage />)
    for (const property of properties) {
      expect(
        screen.getByText(`${property.location}, ${property.country}`)
      ).toBeInTheDocument()
    }
  })
  it('shows owner name', async () => {
    renderWithProvider(<PropertiesPage />)
    for (const property of properties) {
      expect(screen.getByText(property.owner)).toBeInTheDocument()
    }
  })
  it('shows rating', async () => {
    renderWithProvider(<PropertiesPage />)
    for (const property of properties) {
      expect(screen.getByText(property.rating)).toBeInTheDocument()
    }
  })
})
