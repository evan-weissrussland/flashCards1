import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['text', 'password', 'search'],
    },
  },
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    disabled: false,
    error: '',
    placeholder: 'Input',
    variant: 'text',
  },
}

export const Password: Story = {
  args: {
    disabled: false,
    error: 'Error!',
    placeholder: 'Input',
    type: 'password',
    variant: 'password',
  },
}
export const Search: Story = {
  args: {
    disabled: false,
    error: 'Error!',
    placeholder: 'Input',
    type: 'search',
    variant: 'search',
  },
}
