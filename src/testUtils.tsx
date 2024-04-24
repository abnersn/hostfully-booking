import { render } from '@testing-library/react'

import type { PropsWithChildren, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { fetchProperties } from 'redux-store/slices/properties'
import { store } from './redux-store'

function TestWrapper(props: PropsWithChildren): ReactElement {
  // Dispatch action to fetch properties
  store.dispatch(fetchProperties())

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={props.children} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export function renderWithProvider(ui: ReactElement): void {
  render(ui, {
    wrapper: TestWrapper
  })
}
