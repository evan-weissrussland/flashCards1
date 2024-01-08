import type { Meta, StoryObj } from '@storybook/react'

import { CheckboxComponent } from './'

const meta = {
  argTypes: {},
  component: CheckboxComponent,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof CheckboxComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Checked: Story = {
  args: {
    checked: true,
  },
}
export const Unchecked: Story = {
  args: {
    checked: false,
  },
}
export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
}
export const UncheckedDisabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
}
export const CheckedWithLabel: Story = {
  args: {
    checked: true,
    children: 'Check-box',
  },
}

export const UncheckedWithLabel: Story = {
  args: {
    checked: false,
    children: 'Check-box',
  },
}

export const DisabledUncheckedWithLabel: Story = {
  args: {
    checked: false,
    children: 'Check-box',
    disabled: true,
  },
}

export const DisabledCheckedWithLabel: Story = {
  args: {
    checked: true,
    children: 'Check-box',
    disabled: true,
  },
}
