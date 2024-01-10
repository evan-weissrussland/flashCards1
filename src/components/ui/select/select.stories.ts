import type { Meta, StoryObj } from '@storybook/react'

import { SelectComponent } from './'

const meta = {
  argTypes: {},
  component: SelectComponent,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof SelectComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Select primary',
    disabled: false,
    variant: undefined,
  },
}
