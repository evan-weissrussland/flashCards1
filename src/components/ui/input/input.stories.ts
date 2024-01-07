import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './'

const meta = {
  argTypes: {},
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
  },
}

export const Password: Story = {
  args: {
    disabled: false,
    error: '',
    placeholder: 'Input',
    type: 'password',
  },
}
export const Search: Story = {
  args: {
    disabled: false,
    error: '',
    placeholder: 'Card search',
    type: 'search',
  },
}
