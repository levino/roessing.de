import { EventProps, Event } from './Event'

export const EventOverviewPage: React.FC<{ events: EventProps[] }> = ({
  events,
}) => {
  const groupEventsByMonth = () => {
    const groupedEvents: Record<string, EventProps[]> = {}

    events.forEach((event) => {
      const month = event.date.split(' ')[1]

      if (groupedEvents[month]) {
        groupedEvents[month].push(event)
      } else {
        groupedEvents[month] = [event]
      }
    })

    return groupedEvents
  }

  const groupedEvents = groupEventsByMonth()

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Veranstaltungen in unserer Stadt
      </h1>

      {Object.keys(groupedEvents).map((month) => (
        <div key={month} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{month}</h2>

          {groupedEvents[month].map((event, index) => (
            <Event key={index} {...event} />
          ))}
        </div>
      ))}
    </div>
  )
}
