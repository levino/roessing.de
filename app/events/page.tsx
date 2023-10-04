import { Event } from '../../components/Events/Event'
import { getFutureEvents } from '../../data/events'

const EventOverviewPage = async () => {
  const futureEvents = await getFutureEvents()
  return (
    <>
      <div className="container flex flex-col mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 dark:text-slate-100">
          Veranstaltungen in Rössing
        </h1>

        {Object.keys(futureEvents).map((month) => (
          <div key={month} className="mb-8 flex flex-col">
            <h2 className="text-2xl font-bold mb-4 dark:text-slate-200">
              {month}
            </h2>
            <div className="flex flex-col mx-auto">
              {futureEvents[month].map((event, index) => (
                <Event key={index} {...event} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <StickyButton />
    </>
  )
}

const StickyButton = () => (
  <a
    className="button fixed bottom-4 right-4 z-50 p-4 text-white bg-teal-700 rounded-full min-w-200 shadow-lg lg:bottom-8 lg:right-8"
    href="https://docs.google.com/forms/d/e/1FAIpQLSd7uyj3bMztiZZMhCc2dZR-Zr3sZBrEqIi7ZJSbFTwjbbS4QQ/viewform?usp=sf_link"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="hidden md:inline">Veranstaltung hinzufügen</span>
    <span className="md:hidden px-2 text-lg">+</span>
  </a>
)

export default EventOverviewPage
