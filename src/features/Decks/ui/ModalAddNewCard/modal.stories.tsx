import type { Meta, StoryObj } from '@storybook/react'

import { ModalAddNewCard } from './ModalAddNewCard'

const meta = {
  argTypes: {},
  component: ModalAddNewCard,
  tags: ['autodocs'],
  title: 'Components/ModalAddNewCard',
} satisfies Meta<typeof ModalAddNewCard>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
