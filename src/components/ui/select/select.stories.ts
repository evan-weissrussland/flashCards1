import type { Meta, StoryObj } from '@storybook/react'

import { SelectComponent } from './'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: [
        'Large',
        'H1',
        'H2',
        'H3',
        'Body 1',
        'Subtitle 1',
        'Body 2',
        'Subtitle 2',
        'Caption',
        'Overline',
        'Link 1',
        'Link 2',
      ],
    },
  },
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
    variant: 'Body 2',
  },
}
