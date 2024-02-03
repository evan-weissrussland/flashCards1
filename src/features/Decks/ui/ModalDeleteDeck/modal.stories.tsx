import type { Meta, StoryObj } from '@storybook/react'

import { ModalDeleteDeck } from '@/features/Decks/ui/ModalDeleteDeck/ModalDeleteDeck'

const meta = {
  argTypes: {},
  component: ModalDeleteDeck,
  tags: ['autodocs'],
  title: 'Components/ModalDeleteDeck',
} satisfies Meta<typeof ModalDeleteDeck>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
