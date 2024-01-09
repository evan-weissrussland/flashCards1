import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './'

const meta = {
  argTypes: {
    as: {
      control: { type: 'radio' },
      options: ['a', 'div'],
    },
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
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const TypographyExample: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, velit?',
    href: 'https:\\google.com',
    variant: 'Large',
  },
}
