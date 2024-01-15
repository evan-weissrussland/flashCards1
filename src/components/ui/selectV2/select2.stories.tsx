import type { Meta, StoryObj } from '@storybook/react'

import { Select, SelectContent, SelectItem, SelectTrigger } from './'

const meta = {
  argTypes: {
    onValueChange: {
      action: 'Clicked',
      description: 'Clicked button inside form',
    },
  },
  component: Select,
  tags: ['autodocs'],
  title: 'Components/SelectV2',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const child = (
  <>
    <SelectTrigger
      disabled={false}
      placeholder={'Select-box'}
      typography={'Body 1'}
    ></SelectTrigger>
    <SelectContent>
      <SelectItem disabled={false} typography={'Body 1'} value={'item1'}>
        1
      </SelectItem>
      <SelectItem disabled={false} typography={'Body 1'} value={'item2'}>
        2
      </SelectItem>
    </SelectContent>
  </>
)

export const Primary: Story = {
  args: {
    children: child,
    disabled: false,
    label: 'Select-box',
    typography: 'Body 2',
  },
}
