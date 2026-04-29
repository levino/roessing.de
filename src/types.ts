import type { CollectionEntry } from 'astro:content'

export type Event = CollectionEntry<'events'>
export type Organizer = CollectionEntry<'organizers'>
export type Location = CollectionEntry<'locations'>
export type FullEvent = Event & {
  data: Omit<Event['data'], 'organizer' | 'location'> & {
    organizer: Organizer
    location: Location
  }
}

export type Job = CollectionEntry<'jobs'>
export type FullJob = Job & {
  data: Omit<Job['data'], 'hiringOrganization' | 'location'> & {
    hiringOrganization: Organizer
    location?: Location
  }
}
