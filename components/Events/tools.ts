export const getMonth: (date: Date) => string = (date) =>
  date.toLocaleString('de-DE', {
    month: 'long',
  })

export const timeAndDate = (date: Date) =>
  date.toLocaleString('de-DE', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
