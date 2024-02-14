import type { Meta, StoryObj } from '@storybook/react'

import { ModalLearnToDeck } from './ModalLearnToDeck'

const meta = {
  argTypes: {},
  component: ModalLearnToDeck,
  tags: ['autodocs'],
  title: 'Components/ModalAddNewCard',
} satisfies Meta<typeof ModalLearnToDeck>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    deckId: 'string',
    name: 'string',
  },
}
