import React from 'react'
import Link from 'next/link'
import { Event as EventType, Organization } from 'data/events/event'
import * as O from 'fp-ts/Option'

import { constant, identity } from 'fp-ts/function'
import { onRight, timeAndDate } from '../../components/Events/tools'
import { Option } from 'fp-ts/Option'
import Image, { StaticImageData } from 'next/image'

export const Event: React.FC<EventType & { loadImageEager: boolean }> = (
  props
) => (
  <Link
    className="my-4 flex md:h-48 flex-col items-center md:justify-end bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    href={getHref(props)}
    target={getTarget(props)}
  >
    {onRight((image: StaticImageData) => (
      <div className="w-full rounded-t-lg md:h-auto md:w-1/3 md:rounded-none md:rounded-l-lg overflow-hidden">
        <Image
          className="object-cover h-32 md:h-48 "
          src={image}
          loading={props.loadImageEager ? 'eager' : 'lazy'}
          placeholder="blur"
          alt="Event Teaser Image"
          sizes="(max-width: 768px) 100vw, 12rem"
        />
      </div>
    ))(props.data.image)}
    <div className="flex flex-col justify-between p-4 leading-normal w-full md:w-2/3">
      <p className="font-bold dark:text-slate-200">{props.data.name}</p>
      <Organizer organizer={props.data.organizer} />
      <p className="text-gray-800 dark:text-slate-400">
        Ort: {props.data.location.name}
      </p>
      <p className="text-gray-600 dark:text-slate-100">
        {timeAndDate(props.data.startDate)}
      </p>
      <div className="text-gray-800 dark:text-slate-100 line-clamp-2">
        {onRight(identity)(props.data.description)}
      </div>
    </div>
  </Link>
)

const Organizer = ({ organizer }: { organizer: Option<Organization> }) =>
  O.match(
    () => null,
    (organizer: Organization) => (
      <p className="text-gray-500">Veranstalter:in: {organizer.name}</p>
    )
  )(organizer)

const getHref = ({ slug, data: { url } }: EventType): string =>
  O.match(
    () =>
      O.match(
        () => '',
        (value: string) => `/events/${value}`
      )(slug),
    (value: string) => value
  )(url)

const getTarget = (event: EventType): string =>
  O.match(constant('_self'), constant('_blank'))(event.data.url)
