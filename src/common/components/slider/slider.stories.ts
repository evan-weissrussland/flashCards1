import type { Meta, StoryObj } from '@storybook/react'

import { RangeSlider } from '@/common/components/slider/slider'

const meta = {
  component: RangeSlider,
  tags: ['autodocs'],
  title: 'Components/RangeSlider',
} satisfies Meta<typeof RangeSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'RangeSlider primary',
    defaultValue: [25, 75] as never,
    disabled: false,
    max: 100,
    min: 1,
    values: [0, 11],
  },
}
