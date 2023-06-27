import { getMonth } from './tools'

describe('tools', () => {
  test('getMonth', () => expect(getMonth(event)).toEqual('August'))
})

const event = {
  '@context': 'http://schema.org',
  '@type': 'Event',
  name: 'Sommermusikfestival',
  startDate: '2023-08-10T18:00:00+02:00',
  endDate: '2023-08-12T23:59:59+02:00',
  location: {
    '@type': 'Place',
    name: 'Central Park',
    address: '123 Hauptstraße, New York, NY 10001',
  },
  description:
    'Kommen Sie zu einem dreitägigen Musikfestival im Central Park und genießen Sie Live-Auftritte von Top-Künstlern aus aller Welt.',
}
