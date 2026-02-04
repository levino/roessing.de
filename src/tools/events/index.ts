const TIMEZONE = 'Europe/Berlin'

export const getMonth: (date: Date) => string = (date) =>
  date.toLocaleString('de-DE', {
    month: 'long',
    timeZone: TIMEZONE,
  })

export const getYear: (date: Date) => string = (date) =>
  date.toLocaleString('de-DE', {
    year: 'numeric',
    timeZone: TIMEZONE,
  })

export const getDay: (date: Date) => number = (date) =>
  parseInt(
    date.toLocaleString('de-DE', {
      day: 'numeric',
      timeZone: TIMEZONE,
    }),
    10,
  )

export const getWeekday: (date: Date) => string = (date) =>
  date.toLocaleString('de-DE', {
    weekday: 'short',
    timeZone: TIMEZONE,
  })

export const getTime: (date: Date) => string = (date) =>
  date.toLocaleString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TIMEZONE,
  })

export const dateOnly = (date: Date) =>
  date.toLocaleString('de-DE', {
    dateStyle: 'long',
    timeZone: TIMEZONE,
  })

export const timeAndDate = (date: Date) =>
  `${date.toLocaleString('de-DE', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: TIMEZONE,
  })} Uhr`
