import GalleryPage from 'pages/Properties'
import renderWithProviders from 'testUtils'

describe('<Properties />', () => {
  it('renders', async () => {
    renderWithProviders(<GalleryPage />)

    expect(true).toBe(true)
  })
})
