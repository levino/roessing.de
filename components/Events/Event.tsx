import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { Event as EventType, Organization } from 'src/event'
import * as O from 'fp-ts/Option'
import { constant, pipe } from 'fp-ts/function'
import * as S from 'fp-ts-std/Struct'
import { Description } from './Components'
import { timeAndDate } from './tools'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { Option } from 'fp-ts/Option'

export const Event: React.FC<EventType> = (event) => (
  <>
    <Link className="flex" href={getHref(event)} target={getTarget(event)}>
      <div className="hidden md:flex flex grow mb-4">
        <div className="w-1/3 flex items-center">
          <OptionalImage image={event.image} />
        </div>
        <div className="w-2/3 pl-4 my-auto">
          <p className="font-bold">{event.name}</p>
          <Organizer organizer={event.organizer} />
          <p className="text-gray-800">Ort: {event.location.name}</p>
          <p className="text-gray-600">{timeAndDate(event.startDate)}</p>
          <Description
            className="text-sm mt-2 whitespace-pre-line"
            description={event.description}
          />
        </div>
      </div>
      <div className="flex flex-col md:hidden mb-8 grow">
        <div className="flex grow mb-2">
          <div className="w-1/3 flex items-center">
            <OptionalImage image={event.image} />
          </div>
          <div className="w-2/3 pl-2">
            <p className="font-bold">{event.name}</p>
            <Organizer organizer={event.organizer} />
            <p className="text-gray-800">Ort: {event.location.name}</p>
            <p className="text-gray-600">{timeAndDate(event.startDate)}</p>
          </div>
        </div>
        <Description
          className="text-sm mt-2 whitespace-pre-line"
          description={event.description}
        />
      </div>
    </Link>
  </>
)

const Organizer = ({ organizer }: { organizer: Option<Organization> }) =>
  O.match(
    () => null,
    (organizer: Organization) => (
      <p className="text-gray-500">Veranstalter:in: {organizer.name}</p>
    )
  )(organizer)

const OptionalImage = ({ image }: { image: Option<StaticImport> }) =>
  O.match(
    () => null,
    (image: StaticImport) => (
      <Image
        placeholder="blur"
        src={image}
        alt="Event Preview"
        sizes="100vw"
        className="rounded"
      />
    )
  )(image)
const getHref = (event: EventType): string =>
  pipe(
    event,
    S.get('url'),
    O.getOrElse(() => `/events/${event.slug}`)
  )

const getTarget = (event: EventType): string =>
  O.match(constant('_self'), constant('_blank'))(event.url)
