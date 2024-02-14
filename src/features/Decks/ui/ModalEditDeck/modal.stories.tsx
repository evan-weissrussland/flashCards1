import type { Meta, StoryObj } from '@storybook/react'

import { ModalEditDeck } from '@/features/Decks/ui/ModalEditDeck/ModalEditDeck'

const meta = {
  argTypes: {},
  component: ModalEditDeck,
  tags: ['autodocs'],
  title: 'Components/ModalEditDeck',
} satisfies Meta<typeof ModalEditDeck>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    deckCover: 'string',
    deckId: 'string',
    deckIsPrivate: true,
    deckName: 'string',
  },
}
