import { render } from '@testing-library/react'

import type { PropsWithChildren, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { store } from './redux-store'

function TestWrapper(props: PropsWithChildren): ReactElement {
  store.dispatch({ type: 'properties/reset' })
  return <Provider store={store}>{props.children}</Provider>
}

export function renderWithProvider(ui: ReactElement): void {
  render(ui, {
    wrapper: TestWrapper
  })
}
