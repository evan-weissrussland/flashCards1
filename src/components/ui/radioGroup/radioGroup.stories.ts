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
    className: '',
    disabled: false,
    id: '2w',
    value: 'ReactNode',
  },
}
