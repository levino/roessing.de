import { generateStaticParams } from './events/[...slug]/page'

const allEvents = generateStaticParams().map(({ slug }) => ({
  url: `https://www.rössing.de/events/${slug.join('/')}`,
}))

export default async () =>
  Promise.all([
    {
      url: 'https://www.rössing.de',
    },
    {
      url: 'https://www.rössing.de/events',
    },
    {
      url: 'https://www.rössing.de/imprint',
    },
    ...allEvents,
  ])
