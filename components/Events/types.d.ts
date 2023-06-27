export interface Event {
  '@context': string
  '@type': string
  name: string
  startDate: string
  endDate: string
  location: {
    '@type': string
    name: string
    address?: string
  }
  description: string
  image?: string[]
}
