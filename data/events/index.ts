import { Event, Validation as EventValidation } from 'data/events/event'
import { flow, pipe, identity } from 'fp-ts/function'
import * as A from 'fp-ts/Array'

import fs from 'fs/promises'
import path from 'path'
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

type EventFileData = {
  slug?: string
  file: object
}

const getAllEventFilenames = () =>
  fs.readdir(path.join('events')).then(A.filter(Str.endsWith('.mdx')))

const getAllEventFiles = () =>
  getAllEventFilenames()
    .then(
      A.map(async (filename) => ({
        file: await import(`/events/${filename}`),
        slug: fileNameToSlug(filename),
      }))
    )
    .then(
      Promise.all.bind(Promise) as (
        eventFileData: Promise<EventFileData>[]
      ) => Promise<EventFileData[]>
    )

const fileNameToSlug = flow(
  Str.replace(/\.[^/.]+$/, ''),
  (withoutFileExtension: string) => withoutFileExtension.replaceAll('-', '/')
)

export const getEvent = ({ file, slug }: EventFileData) =>
  Event.decode({
    ...file,
    slug,
  })

export const getEvents: () => Promise<EventValidation[]> = () =>
  getAllEventFiles().then(A.map(getEvent))

const groupEventsByMonth = groupBy<Event>(flow(getStartDate, getMonth))
const byDate = pipe(D.Ord, contramap<Date, Event>(getStartDate))

const sortEventsByStartDate: (events: Event[]) => Event[] = A.sortBy([byDate])

const removePastEvents = (now: Date): ((events: Event[]) => Event[]) =>
  A.filter((event: Event) => D.Ord.compare(now, event.data.startDate) === -1)

const getFailedValidations = () => getEvents().then(A.filter(E.isLeft))

;(() =>
  getFailedValidations().then((failedValidations) => {
    if (failedValidations.length > 0) {
      console.log('Some validations failed!')
      failedValidations.forEach(flow(PathReporter.report, console.log))
    }
  }))()

const getValidEvents: () => Promise<Event[]> = () =>
  getEvents().then(flow(A.partitionMap(identity), S.get('right')))

const getValidFutureEvents = (now: Date) =>
  getValidEvents().then(removePastEvents(now))

const eventsByMonth = flow(sortEventsByStartDate, groupEventsByMonth)

export const revalidate = 3600

export const getFutureEvents = cache(() =>
  getValidFutureEvents(new Date()).then(eventsByMonth)
)

export const getAllSlugs = () =>
  getAllEventFilenames().then(A.map(fileNameToSlug))
