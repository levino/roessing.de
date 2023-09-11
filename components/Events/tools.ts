import React from 'react'
import * as O from 'fp-ts/Option'

export const getMonth: (date: Date) => string = (date) =>
  date.toLocaleString('de-DE', {
    month: 'long',
    timeZone: 'Europe/Berlin',
  })

export const timeAndDate = (date: Date) =>
  date.toLocaleString('de-DE', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Europe/Berlin',
  })
export const onRight = <T>(render: (value: T) => React.ReactNode) =>
  O.match(() => null, render)
