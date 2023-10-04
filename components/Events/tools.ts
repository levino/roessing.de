import * as O from 'fp-ts/Option'

export const getMonth: (date: Date) => string = (date) =>
  date.toLocaleString('de-DE', {
    month: 'long',
    timeZone: 'Europe/Berlin',
  })

export const timeAndDate = (date: Date) =>
  `${date.toLocaleString('de-DE', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin',
  })} Uhr`
export const onRight = <T, U>(render: (value: T) => U) =>
  O.match(() => null, render)
