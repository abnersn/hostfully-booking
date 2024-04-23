import { render, screen } from '@testing-library/react'
import PropertiesPage from 'pages/Properties'

import properties from '../../mocks/properties.json'

describe('<Properties />', () => {
  it('renders', async () => {
    render(<PropertiesPage />)

    for (const property of properties) {
      expect(screen.getByText(property.title)).toBeInTheDocument()
      console.log(property.title)
    }
    expect(true).toBe(true)
  })
})
