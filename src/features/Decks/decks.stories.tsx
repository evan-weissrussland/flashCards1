import type { Meta, StoryObj } from '@storybook/react'

import { Decks } from '@/features/Decks/Decks'

const meta = {
  argTypes: {},
  component: Decks,
  tags: ['autodocs'],
  title: 'Components/Decks',
} satisfies Meta<typeof Decks>

export default meta
type Story = StoryObj<typeof meta>

export const Decks1: Story = {}
