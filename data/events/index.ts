import { Event } from 'data/events/event'
import { flow, pipe, identity } from 'fp-ts/function'
import { ifElse } from 'fp-ts-std/Function'
import * as A from 'fp-ts/Array'
import * as S from 'fp-ts-std/Struct'
import { getMonth } from '../../components/Events/tools'
import * as D from 'fp-ts/Date'
import { contramap } from 'fp-ts/Ord'
import * as E from 'fp-ts/Either'
import { groupBy } from 'fp-ts/NonEmptyArray'
import { PathReporter } from 'io-ts/PathReporter'
import * as Str from 'fp-ts/string'
import { cache } from 'react'

const getStartDate: (event: Event) => Date = flow(
  S.get('data'),
  S.get('startDate')
)

const fileNameToSlug = flow(
  Str.replace(/^\.\//, ''),
  (withoutFileExtension: string) => withoutFileExtension.replaceAll('-', '/'),
  Str.replace(/\.mdx$/, '')
)

const eventsContext = require.context('../../events', false, /\.mdx$/)

export const importEvent = (filename: string) =>
  Event.decode({
    ...eventsContext(filename),
    slug: fileNameToSlug(filename),
  })

const events = eventsContext
  .keys()
  .filter((key) => !key.startsWith('events/'))
  .map(importEvent)

const groupEventsByMonth = groupBy<Event>(flow(getStartDate, getMonth))
const byDate = pipe(D.Ord, contramap<Date, Event>(getStartDate))

const sortEventsByStartDate: (events: Event[]) => Event[] = A.sortBy([byDate])

const removePastEvents = (now: Date): ((events: Event[]) => Event[]) =>
  A.filter((event: Event) => D.Ord.compare(now, event.data.startDate) === -1)

events.forEach(
  ifElse(flow(PathReporter.report, console.log))(() => void 0)(E.isLeft)
)

const validEvents: Event[] = pipe(
  events,
  A.partitionMap(identity),
  S.get('right')
)

const getValidFutureEvents = (now: Date) => removePastEvents(now)(validEvents)

const eventsByMonth = flow(sortEventsByStartDate, groupEventsByMonth)

export const revalidate = 3600

export const getFutureEvents = cache(() =>
  pipe(new Date(), getValidFutureEvents, eventsByMonth)
)

export const allSlugs = eventsContext
  .keys()
  .filter((key) => !key.startsWith('events/'))
  .map(fileNameToSlug)
