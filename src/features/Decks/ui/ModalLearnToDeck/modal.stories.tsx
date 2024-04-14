import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'

import { store } from '@/services/store'

import { ModalLearnToDeck } from './ModalLearnToDeck'

const meta = {
  argTypes: {},
  component: ModalLearnToDeck,
  decorators: [story => <Provider store={store}>{story()}</Provider>],
  tags: ['autodocs'],
  title: 'Components/ModalLearnToDeck',
} satisfies Meta<typeof ModalLearnToDeck>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    deckId: 'string',
    name: 'string',
  },
}
