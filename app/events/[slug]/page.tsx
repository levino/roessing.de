import { allEventsBySlug } from 'data/events'
import { EventPage } from 'components/Events/EventPage'
import React from 'react'
import { onRight } from '../../../components/Events/tools'
import { identity } from 'fp-ts/function'
export const generateStaticParams = async () => Object.keys(allEventsBySlug)

interface EventPageProps {
  params: { slug: string }
}

export const generateMetadata = ({ params: { slug } }: EventPageProps) => {
  const {
    name: title,
    og: { description },
  } = allEventsBySlug[slug]
  return {
    title,
    description,
    openGraph: {
      title,
      description: onRight(identity)(description),
    },
  }
}

const Page: React.FC<EventPageProps> = ({ params: { slug } }) => (
  <EventPage {...allEventsBySlug[slug]} />
)

export default Page
