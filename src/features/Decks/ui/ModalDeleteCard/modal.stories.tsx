import type { Meta, StoryObj } from '@storybook/react'

import { ModalDeleteCard } from '@/features/Decks/ui/ModalDeleteCard/ModalDeleteCard'

const meta = {
  argTypes: {},
  component: ModalDeleteCard,
  tags: ['autodocs'],
  title: 'Components/ModalDeleteCard',
} satisfies Meta<typeof ModalDeleteCard>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    idDeck: 'string',
  },
}
