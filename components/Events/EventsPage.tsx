import { getMonth } from 'components/Events/tools'
import { Event } from './Event'
import { Event as EventProps } from './types'
import * as R from 'ramda'
export const EventOverviewPage: React.FC<{ events: EventProps[] }> = ({
  events,
}) => {
  const groupedEvents = groupEvents(events)

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Veranstaltungen in unserer Stadt
      </h1>

      {Object.keys(groupedEvents).map((month) => (
        <div key={month} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{month}</h2>

          {groupedEvents[month].map((event, index) => (
            <Event key={index} id={index.toString()} {...event} />
          ))}
        </div>
      ))}
    </div>
  )
}

const groupEvents: (
  events: EventProps[]
) => Record<string, EventProps[]> = R.reduce(
  (acc, event) => ({
    ...acc,
    [getMonth(event)]: [...(acc[getMonth(event)] || []), event],
  }),
  {} as Record<string, EventProps[]>
)
