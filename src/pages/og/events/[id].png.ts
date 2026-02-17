import { getCollection, getEntry } from 'astro:content'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { GetStaticPaths } from 'astro'
import satori from 'satori'
import sharp from 'sharp'
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

  const eventName = entry.data.name
  const dateStr = dateOnly(entry.data.startDate)
  const timeStr = entry.data.allDay ? undefined : getTime(entry.data.startDate)
  const locationName = locationEntry?.data.name
  const organizerName = organizerEntry?.data.name

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 70px',
          background: 'linear-gradient(135deg, #5a7f77 0%, #3d3833 100%)',
          fontFamily: 'Inter',
          color: '#ffffff',
        },
        children: [
          // Oberer Bereich: Branding + Akzentlinie
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            width: '8px',
                            height: '32px',
                            backgroundColor: '#f0b8a8',
                            borderRadius: '4px',
                          },
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '28px',
                            fontWeight: 400,
                            letterSpacing: '2px',
                            opacity: 0.9,
                          },
                          children: 'RÖSSING',
                        },
                      },
                    ],
                  },
                },
                // Trennlinie
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '100%',
                      height: '1px',
                      backgroundColor: 'rgba(255,255,255,0.15)',
                    },
                  },
                },
              ],
            },
          },
          // Mittlerer Bereich: Event-Name
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                justifyContent: 'center',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: eventName.length > 40 ? '42px' : '52px',
                      fontWeight: 700,
                      lineHeight: 1.2,
                      maxHeight: '200px',
                      overflow: 'hidden',
                    },
                    children: eventName,
                  },
                },
              ],
            },
          },
          // Unterer Bereich: Details
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              },
              children: [
                // Trennlinie
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '100%',
                      height: '1px',
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      marginBottom: '4px',
                    },
                  },
                },
                // Datum und Uhrzeit
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '26px',
                      color: '#f0b8a8',
                      fontWeight: 700,
                    },
                    children: `${dateStr}${timeStr ? `  ·  ${timeStr} Uhr` : ''}`,
                  },
                },
                // Location und Veranstalter in einer Zeile
                ...(locationName || organizerName
                  ? [
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '22px',
                            color: 'rgba(255,255,255,0.7)',
                          },
                          children: [
                            locationName,
                            ...(locationName && organizerName
                              ? [
                                  {
                                    type: 'div',
                                    props: {
                                      style: {
                                        width: '4px',
                                        height: '4px',
                                        borderRadius: '50%',
                                        backgroundColor:
                                          'rgba(255,255,255,0.4)',
                                        margin: '0 8px',
                                      },
                                    },
                                  },
                                  organizerName,
                                ]
                              : organizerName
                                ? [organizerName]
                                : []),
                          ].filter(Boolean),
                        },
                      },
                    ]
                  : []),
              ],
            },
          },
        ],
      },
    },
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
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
