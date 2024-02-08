import type { Meta, StoryObj } from '@storybook/react'

import { DropDownMyDeck } from '@/features/DropDownMyDeck/DropDownMyDeck'

const meta = {
  argTypes: {},
  component: DropDownMyDeck,
  tags: ['autodocs'],
  title: 'Components/DropDownMyDeck',
} satisfies Meta<typeof DropDownMyDeck>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
