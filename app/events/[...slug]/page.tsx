import { EventPage } from '@/app/events/[...slug]/EventPage'
import { Event as EventType } from '@/data/events/event'
import { getAllSlugs, getEvent } from '../../../data/events'
import * as A from 'fp-ts/Array'
import * as Str from 'fp-ts/string'
import { PathReporter } from 'io-ts/PathReporter'
import { isLeft } from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import * as S from 'fp-ts-std/Struct'
import { StaticImageData } from 'next/image'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { timeAndDate } from '@/components/Events/tools'
interface EventPageProps {
  params: { slug: string[] }
}
const getTitle = (event: EventType) => `${event.data.name} - rössing.de`

const getDescription: (event: EventType) => string = flow(
  S.get('data'),
  S.get('description'),
  O.match(
    () => '',
    (description) => ` - ${description}`
  )
)

const getImagesObject: (event: EventType) => { src?: string } = flow(
  S.get('data'),
  S.get('image'),
  O.match(
    () => ({}),
    ({ src }: StaticImageData) => ({ images: [src] })
  )
)

export const generateMetadata = async ({
  params: { slug },
}: EventPageProps) => {
  const postValidation = getEvent({
    file: await import(`events/${slug.join('-')}.mdx`),
    slug: slug.join('/'),
  })
  return E.match(
    () => ({}),
    (event: EventType) => ({
      title: getTitle(event),
      description: `${timeAndDate(event.data.startDate)}${getDescription(
        event
      )}`,
      openGraph: {
        title: getTitle(event),
        description: `${timeAndDate(event.data.startDate)}${getDescription(
          event
        )}`,
        ...getImagesObject(event),
      },
    })
  )(postValidation)
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
