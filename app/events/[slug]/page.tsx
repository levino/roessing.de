import { allEventsBySlug } from 'data/events'
import { EventPage } from 'components/Events/EventPage'
import React from 'react'
export const generateStaticParams = async () => Object.keys(allEventsBySlug)

interface EventPageProps {
  params: { slug: string }
}

export const generateMetadata = ({ params: { slug } }: EventPageProps) => {
  const { name: title, description } = allEventsBySlug[slug]
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  }
}

const Page: React.FC<EventPageProps> = ({ params: { slug } }) => (
  <EventPage {...allEventsBySlug[slug]} />
)

export default Page
