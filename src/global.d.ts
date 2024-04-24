import { SetupServerApi } from 'msw/node'
import { IProperty } from './types'

declare global {
  namespace globalThis {
    var properties: IProperty[]
    var server: SetupServerApi
  }
}
