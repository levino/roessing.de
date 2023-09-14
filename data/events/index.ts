import {
  Event as EventType,
  Event,
  Validation as EventValidation,
} from 'src/event'
import { events as rawEvents } from './events'
import { flow, identity, pipe } from 'fp-ts/function'
import * as A from 'fp-ts/Array'
import { Errors } from 'io-ts'
import * as S from 'fp-ts-std/Struct'
import { getMonth } from '../../components/Events/tools'
import * as D from 'fp-ts/Date'
import { contramap } from 'fp-ts/Ord'
import * as E from 'fp-ts/Either'
import { groupBy } from 'fp-ts/NonEmptyArray'
import { PathReporter } from 'io-ts/PathReporter'
export const events = pipe(rawEvents, A.map(Event.decode))

const groupEventsByMonth = groupBy<EventType>(
  flow(S.get('startDate'), getMonth)
)
const byDate = pipe(D.Ord, contramap<Date, EventType>(S.get('startDate')))

const sortEventsByStartDate: (events: EventType[]) => EventType[] = A.sortBy([
  byDate,
])

const now = new Date()

const removePastEvents = A.filter(
  (event: Event) => D.Ord.compare(now, event.startDate) === -1
)

const failedValidations = A.filter(E.isLeft)(events)

if (failedValidations.length > 0) {
  console.log('Some validations failed!')
  failedValidations.forEach(flow(PathReporter.report, console.log))
}

const validEvents = pipe(
  events,
  A.partitionMap<EventValidation, Errors, EventType>(identity),
  S.get('right')
)

const validFutureEvents = pipe(validEvents, removePastEvents)

const eventsByMonth = flow(sortEventsByStartDate, groupEventsByMonth)
export const futureEvents = pipe(validFutureEvents, eventsByMonth)

export const allEventsBySlug: Record<string, Event> = pipe(
  validEvents,
  A.reduce({}, (acc, event) => ({
    [event.slug]: event,
    ...acc,
  }))
)
