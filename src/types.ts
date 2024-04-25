export interface IProperty {
  id: string
  title: string
  description: string
  owner: string
  location: string
  picture: string
  country: string
  hasWifi: boolean
  hasTV: boolean
  hasAC: boolean
  hasSingleBed: boolean
  hasDoubleBed: boolean
  breakfastIncluded: boolean
  rating: number
  pricingPerNight: number

  schedule: string
}

export interface IBooking {
  id: string
  propertyId: string
  startDate: Date
  endDate: Date
  price: number
}

export interface IPropertiesSliceState {
  data: IProperty[]
  status: 'idle' | 'success' | 'error' | 'pending'
  error: string | null | undefined
}
