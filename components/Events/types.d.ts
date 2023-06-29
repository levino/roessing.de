interface Location {
  '@type': 'Place'
  name: string
  address?: PostalAddress
}

interface PostalAddress {
  '@type': 'PostalAddress'
  streetAddress?: string
  addressLocality?: string
  addressRegion?: string
  postalCode?: string
  addressCountry?: string
}

export interface Event {
  '@context': string
  '@type': string
  name: string
  startDate: string
  endDate: string
  location: Location
  description: string
  image?: string[]
  link?: string
}
