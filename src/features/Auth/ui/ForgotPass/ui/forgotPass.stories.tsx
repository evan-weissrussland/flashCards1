import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPass } from '@/features/Auth/ui/ForgotPass/ui/ForgotPass'

const meta = {
  component: ForgotPass,
  tags: ['autodocs'],
  title: 'Auth/ForgotPass',
} satisfies Meta<typeof ForgotPass>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
