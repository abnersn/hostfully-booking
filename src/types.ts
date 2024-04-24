export interface IProperty {
  id: string
  title: string
  description: string
  owner: string
  location: string
  picture: string
  country: string
  hasWifi: boolean
  breakfastIncluded: boolean
  rating: number
  pricingPerNight: number
}

export interface IPropertiesSliceState {
  data: IProperty[]
  status: 'idle' | 'success' | 'error' | 'pending'
  error: string | null | undefined
}
