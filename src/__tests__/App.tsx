import { screen } from '@testing-library/dom'
import App from 'App'
import { act } from 'react-dom/test-utils'
import { store } from 'redux-store'
import { fetchProperties } from 'redux-store/properties'
import { renderWithProvider } from 'testUtils'

describe('<App />', () => {
  it('triggers fetching when idle', async () => {
    renderWithProvider(<App />)
    await screen.findByText('Loading accomodations...')
    expect(screen.getByText(/perfect accomodation/)).toBeInTheDocument()
  })
  it('displays loading state', () => {
    renderWithProvider(<App />)
    act(() => store.dispatch(fetchProperties.pending('')))
    expect(screen.getByText('Loading accomodations...')).toBeInTheDocument()
  })
  it('displays error state', () => {
    renderWithProvider(<App />)
    act(() => store.dispatch(fetchProperties.rejected(new Error(), '')))
    expect(screen.getByText('Sorry, an error occurred')).toBeInTheDocument()
  })
  it('lists accomodations', () => {
    renderWithProvider(<App />)
    act(() => store.dispatch(fetchProperties.fulfilled(properties, '')))
    expect(screen.getByText(/perfect accomodation/)).toBeInTheDocument()
  })
})
