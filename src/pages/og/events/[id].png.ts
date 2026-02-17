import { getCollection, getEntry } from 'astro:content'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { GetStaticPaths } from 'astro'
import satori from 'satori'
import sharp from 'sharp'
import { EventOgImage } from '@/components/EventOgImage'
import { dateOnly, getTime } from '@/tools/events'
import type { Event } from '@/types'

const interRegular = readFileSync(
  join(process.cwd(), 'src/assets/fonts/Inter-Regular.ttf'),
)
const interBold = readFileSync(
  join(process.cwd(), 'src/assets/fonts/Inter-Bold.ttf'),
)

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getCollection('events')
  return events.map((entry) => ({
    params: { id: entry.id },
    props: { entry },
  }))
}

export async function GET({ props }: { props: { entry: Event } }) {
  const { entry } = props

  const locationEntry = entry.data.location
    ? await getEntry(entry.data.location)
    : undefined
  const organizerEntry = entry.data.organizer
    ? await getEntry(entry.data.organizer)
    : undefined

  const svg = await satori(
    EventOgImage({
      eventName: entry.data.name,
      dateStr: dateOnly(entry.data.startDate),
      timeStr: entry.data.allDay ? undefined : getTime(entry.data.startDate),
      locationName: locationEntry?.data.name,
      organizerName: organizerEntry?.data.name,
    }),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interRegular,
          weight: 400 as const,
          style: 'normal' as const,
        },
        {
          name: 'Inter',
          data: interBold,
          weight: 700 as const,
          style: 'normal' as const,
        },
      ],
    },
  )

  const png = await sharp(Buffer.from(svg)).png().toBuffer()

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  })
}
