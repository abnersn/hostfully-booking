import { render } from '@testing-library/react'

import type { PropsWithChildren, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { fetchProperties } from 'redux-store/properties'
import { store } from './redux-store'

function TestWrapper(props: PropsWithChildren): ReactElement {
  store.dispatch(fetchProperties())
  return (
    <Provider store={store}>
      <BrowserRouter>{props.children}</BrowserRouter>
    </Provider>
  )
}

export function renderWithProvider(ui: ReactElement): void {
  render(ui, {
    wrapper: TestWrapper
  })
}
