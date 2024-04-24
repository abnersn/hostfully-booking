import { render } from '@testing-library/react'
import type { PropsWithChildren, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { store } from './redux-store'

export function renderWithProvider(ui: ReactElement): void {
  render(ui, {
    wrapper: ({ children }: PropsWithChildren): ReactElement => (
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={children} />
          </Routes>
        </BrowserRouter>
      </Provider>
    )
  })
}
