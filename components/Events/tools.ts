import * as R from 'ramda'
import { Event } from './types'

const isoStringToDate: (isodate: string) => Date = R.constructN(1, Date)

export const getMonth: (event: Event) => string = R.pipe(
  R.prop('startDate'),
  isoStringToDate,
  (date) => date.toLocaleString('de-DE', { month: 'long' })
)
