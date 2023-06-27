import type { Meta, StoryObj } from '@storybook/react'
import events from '../../data/events.json'
import { EventOverviewPage } from './EventsPage'

const meta: Meta<typeof EventOverviewPage> = {
  component: EventOverviewPage,
}

export default meta
type Story = StoryObj<typeof EventOverviewPage>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <EventOverviewPage events={events} />,
}
