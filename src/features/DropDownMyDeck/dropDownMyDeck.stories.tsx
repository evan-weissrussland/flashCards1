import type { Meta, StoryObj } from '@storybook/react'

import { DropDownMyDeck } from '@/features/DropDownMyDeck/DropDownMyDeck'

const meta = {
  argTypes: {
    setIsLearn: {
      action: 'Clicked',
    },
  },
  component: DropDownMyDeck,
  tags: ['autodocs'],
  title: 'Components/DropDownMyDeck',
} satisfies Meta<typeof DropDownMyDeck>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    deckCover: 'string',
    deckId: 'string',
    isPrivate: true,
    name: 'string',
  },
}
