import { render } from '@testing-library/react'
import { readFileSync } from 'fs'
import path from 'path'
import type { PropsWithChildren, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { fetchProperties } from 'redux-store/slices/properties'
import { IProperty } from 'types'
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

export function getPropertiesData(): IProperty[] {
  // Get properties from public file
  const propertiesFile = readFileSync(
    path.join(process.cwd(), '/public/mocks/properties.json'),
    'utf-8'
  )
  const properties = JSON.parse(propertiesFile)
  return properties
}
