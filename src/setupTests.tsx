import '@testing-library/jest-dom'
import 'whatwg-fetch'

import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { getPropertiesData } from 'testUtils'

const properties = getPropertiesData()

// Mock requests
const handlers = [
  http.get('/public/mocks/properties.json', () => {
    return HttpResponse.json(properties)
  })
]
const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
