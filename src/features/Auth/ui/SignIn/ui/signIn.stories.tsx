import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from '@/features/Auth/ui/SignIn/ui/SignIn'

const meta = {
  component: SignIn,
  tags: ['autodocs'],
  title: 'Auth/SignIn',
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
