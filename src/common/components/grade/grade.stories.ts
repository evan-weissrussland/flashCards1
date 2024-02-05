import type { Meta, StoryObj } from '@storybook/react'

import { Grade } from '@/common/components/grade/grade'

const meta = {
  component: Grade,
  tags: ['autodocs'],
  title: 'Components/Grade',
} satisfies Meta<typeof Grade>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
