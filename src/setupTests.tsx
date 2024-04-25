import '@testing-library/jest-dom'
import 'whatwg-fetch'

import { readFileSync } from 'fs'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import path from 'path'

const propertiesFile = readFileSync(
  path.join(process.cwd(), '/public/mocks/properties.json'),
  'utf-8'
)
const properties = JSON.parse(propertiesFile)

// Mock requests
const handlers = [
  http.get('/public/mocks/properties.json', () => HttpResponse.json(properties))
]
const server = setupServer(...handlers)

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
  global.properties = properties
  global.server = server
})

// Mock window location to avoid errors when calling refresh
const originalLocation = window.location
beforeEach(() => {
  window.location = originalLocation
})

afterEach(() => server.resetHandlers())
afterAll(() => server.close())
