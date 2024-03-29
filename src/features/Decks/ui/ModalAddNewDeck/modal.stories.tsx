import type { Meta, StoryObj } from '@storybook/react'

import { ModalAddNewDeck } from '@/features/Decks/ui/ModalAddNewDeck/ModalAddNewDeck'

const meta = {
  argTypes: {},
  component: ModalAddNewDeck,
  tags: ['autodocs'],
  title: 'Components/ModalAddNewDeck',
} satisfies Meta<typeof ModalAddNewDeck>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
