import type { Meta, StoryObj } from '@storybook/react'

import { Tabs, TabsList, TabsTrigger } from './'

const meta = {
  argTypes: {
    onValueChange: {
      action: 'Clicked',
    },
  },
  component: Tabs,
  tags: ['autodocs'],
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>
const child = (
  <TabsList>
    <TabsTrigger disabled={false} typography={'Body 1'} value={'My Cards'}>
      My Cards
    </TabsTrigger>
    <TabsTrigger disabled={false} typography={'Body 1'} value={'All Cards'}>
      All Cards
    </TabsTrigger>
  </TabsList>
)

export const Text: Story = {
  args: {
    children: child,
    defaultValue: 'My Cards',
    disabled: false,
    label: 'Show decks cards',
  },
}
