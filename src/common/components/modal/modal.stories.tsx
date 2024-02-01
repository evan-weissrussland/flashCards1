import type { Meta, StoryObj } from '@storybook/react'

import { DropDown } from '@/common/components/dropDown/dropDown'

const meta = {
  argTypes: {},
  component: DropDown,
  tags: ['autodocs'],
  title: 'Components/DropDown',
} satisfies Meta<typeof DropDown>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
