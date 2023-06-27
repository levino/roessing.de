import * as R from 'ramda'

interface Event {
  '@context': string
  '@type': string
  name: string
  startDate: string
  endDate: string
  location: {
    '@type': string
    name: string
    address: string
  }
  description: string
}

const isoStringToDate: (isodate: string) => Date = R.constructN(1, Date)

export const getMonth: (event: Event) => string = R.pipe(
  R.prop('startDate'),
  isoStringToDate,
  (date) => date.toLocaleString('de-DE', { month: 'long' })
)
