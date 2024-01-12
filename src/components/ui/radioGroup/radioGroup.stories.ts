import type { Meta, StoryObj } from '@storybook/react'

import { RadioButton } from './'

const meta = {
  argTypes: {
    callback: { action: 'value' },
  },
  component: RadioButton,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioButton>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    children: {
      child: [
        { id: 'id1', label: 'RadioGroup', value: 'ReactNode1' },
        { id: 'id2', label: 'RadioGroup', value: 'ReactNode2' },
      ],
    },
    className: '',
    disabled: false,
  },
}
