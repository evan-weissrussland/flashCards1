import type { Meta, StoryObj } from '@storybook/react'

import { ModalEditCard } from '@/features/Decks/ui/ModalEditCard/ModalEditCard'

const meta = {
  argTypes: {},
  component: ModalEditCard,
  tags: ['autodocs'],
  title: 'Components/ModalEditCard',
} satisfies Meta<typeof ModalEditCard>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
