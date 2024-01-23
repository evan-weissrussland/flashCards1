import type { Meta, StoryObj } from '@storybook/react'

import { Error404 } from '@/app/ui/Error404/Error404'

const meta = {
  argTypes: {},
  component: Error404,
  tags: ['autodocs'],
  title: 'Components/Error404',
} satisfies Meta<typeof Error404>

export default meta
type Story = StoryObj<typeof meta>

export const Error404Page: Story = {}
