import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouter } from 'react-router-dom'

import { Error404 } from '@/app/ui/Error404/Error404'

const meta = {
  argTypes: {},
  component: Error404,
  tags: ['autodocs'],
  title: 'Components/Error404',
} satisfies Meta<typeof Error404>

export default meta
type Story = StoryObj<typeof meta>

const App = () => {
  return (
    <BrowserRouter>
      <Error404 />
    </BrowserRouter>
  )
}

export const Error404Page: Story = {
  render: () => {
    return <App />
  },
}
