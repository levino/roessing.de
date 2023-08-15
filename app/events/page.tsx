import { Event } from '../../components/Events/Event'

import { validEventsByMonth } from '../../data/events'

const EventOverviewPage: React.FC = () => (
  <>
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Veranstaltungen in Rössing</h1>

      {Object.keys(validEventsByMonth).map((month) => (
        <div key={month} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{month}</h2>

          {validEventsByMonth[month].map((event, index) => (
            <Event key={index} {...event} />
          ))}
        </div>
      ))}
    </div>
    <StickyButton />
  </>
)

const StickyButton = () => (
  <a
    className="button fixed bottom-4 right-4 z-50 p-4 text-white bg-green-700 rounded-full min-w-200 shadow-lg lg:bottom-8 lg:right-8"
    href="'https://docs.google.com/forms/d/e/1FAIpQLSd7uyj3bMztiZZMhCc2dZR-Zr3sZBrEqIi7ZJSbFTwjbbS4QQ/viewform?usp=sf_link'"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="hidden md:inline">Veranstaltung hinzufügen</span>
    <span className="md:hidden px-2 text-lg">+</span>
  </a>
)

export default EventOverviewPage
