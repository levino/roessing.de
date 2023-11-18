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
