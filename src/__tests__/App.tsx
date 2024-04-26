import { screen } from '@testing-library/dom'
import { store } from 'redux-store'
import { fetchProperties } from 'redux-store/properties'

describe('<App />', () => {
  it('displays loading state', () => {
    store.dispatch(fetchProperties.pending(''))
    screen.debug()
    expect(false).toBe(true)
  })
})
