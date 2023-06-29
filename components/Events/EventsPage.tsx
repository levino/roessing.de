import { getMonth } from 'components/Events/tools'
import { Event } from './Event'
import { Event as EventProps } from './types'
import * as R from 'ramda'
import { NextSeo } from 'next-seo'
export const EventOverviewPage: React.FC<{ events: EventProps[] }> = ({
  events,
}) => {
  const groupedEvents = groupEvents(sortEventsByStartDate(events))

  return (
    <>
      <NextSeo title="Veranstaltungen" description="Alle Events in Rössing" />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Veranstaltungen in Rössing</h1>

        {Object.keys(groupedEvents).map((month) => (
          <div key={month} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{month}</h2>

            {groupedEvents[month].map((event, index) => (
              //TODO: Remove the ugly id hack!
              <Event key={index} id="" {...event} />
            ))}
          </div>
        ))}
      </div>
      <StickyButton />
    </>
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

const StickyButton = () => {
  const handleClick = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSd7uyj3bMztiZZMhCc2dZR-Zr3sZBrEqIi7ZJSbFTwjbbS4QQ/viewform?usp=sf_link'
    )
  }

  return (
    <button
      className="fixed bottom-4 right-4 z-50 p-4 text-white bg-green-700 rounded-full min-w-200 shadow-lg lg:bottom-8 lg:right-8"
      onClick={handleClick}
    >
      <span className="hidden md:inline">Veranstaltung hinzufügen</span>
      <span className="md:hidden px-2 text-lg">+</span>
    </button>
  )
}

function sortEventsByStartDate(events: EventProps[]): EventProps[] {
  return [...events].sort((a, b) => {
    const dateA = new Date(a.startDate)
    const dateB = new Date(b.startDate)

    if (dateA < dateB) {
      return -1
    }
    if (dateA > dateB) {
      return 1
    }
    return 0
  })
}

export default StickyButton
