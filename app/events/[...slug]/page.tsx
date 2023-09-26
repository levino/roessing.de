import { EventPage } from 'components/Events/EventPage'

import { getAllSlugs, getEvent } from '../../../data/events'
import * as A from 'fp-ts/Array'
import * as Str from 'fp-ts/string'
import { PathReporter } from 'io-ts/PathReporter'
import { isLeft } from 'fp-ts/Either'
interface EventPageProps {
  params: { slug: string[] }
}

export const generateStaticParams = () =>
  getAllSlugs()
    .then(A.map(Str.split('/')))
    .then(A.map((slug) => ({ slug })))

export default async function Event({ params: { slug } }: EventPageProps) {
  const postValidation = getEvent({
    file: await import(`events/${slug.join('-')}.mdx`),
    slug: slug.join('/'),
  })
  if (isLeft(postValidation)) {
    return (
      <div>
        Event not found! {PathReporter.report(postValidation).join('\n')}
      </div>
    )
  }
  return <EventPage {...postValidation.right} />
}
