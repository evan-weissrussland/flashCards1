import type { Meta, StoryObj } from '@storybook/react'

import { Modalka } from '@/common/components/modal/modal'

const meta = {
  argTypes: {},
  component: Modalka,
  tags: ['autodocs'],
  title: 'Components/Modalka',
} satisfies Meta<typeof Modalka>

export default meta
type Story = StoryObj<typeof meta>
const ddd = (b: boolean) => {
  console.log(b)
}

export const Primary: Story = {
  args: {
    children: <>fff</>,
    onOpenChange: ddd,
    open: false,
  },
}
