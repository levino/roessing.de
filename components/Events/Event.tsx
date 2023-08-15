import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { Event as EventType } from 'src/event'
import * as O from 'fp-ts/Option'
import { constant, pipe } from 'fp-ts/function'
import * as S from 'fp-ts-std/Struct'
import { Description } from './Components'
import { timeAndDate } from './tools'

export const Event: React.FC<EventType> = (event) => (
  <>
    <Link className="flex" href={getHref(event)} target={getTarget(event)}>
      <div className="hidden md:flex flex grow mb-4">
        <div className="w-1/3 flex items-center">
          <Image
            placeholder="blur"
            src={event.image}
            alt="Event Preview"
            className="rounded"
          />
        </div>
        <div className="w-2/3 pl-4 my-auto">
          <p className="font-bold">{event.name}</p>
          <p className="font-gray-800">{event.location?.name}</p>
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
            <Image
              placeholder="blur"
              src={event.image}
              alt="Event Preview"
              className="rounded"
            />
          </div>
          <div className="w-2/3 pl-2">
            <p className="font-bold">{event.name}</p>
            <p className="font-gray-800">{event.location?.name}</p>
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

const getHref = (event: EventType): string =>
  pipe(
    event,
    S.get('url'),
    O.getOrElse(() => `/events/${event.slug}`)
  )

const getTarget = (event: EventType): string =>
  O.match(constant('_self'), constant('_blank'))(event.url)
