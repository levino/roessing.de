import { generateStaticParams } from './events/[...slug]/page'
const BASE_URL = 'https://www.xn--rssing-wxa.de'
const allEvents = generateStaticParams().map(({ slug }) => ({
  url: `${BASE_URL}/events/${slug.join('/')}`,
}))

export default () => [
  {
    url: `${BASE_URL}`,
  },
  {
    url: `${BASE_URL}/events`,
  },
  {
    url: `${BASE_URL}/imprint`,
  },
  {
    url: `${BASE_URL}/about`,
  },
  ...allEvents,
]
