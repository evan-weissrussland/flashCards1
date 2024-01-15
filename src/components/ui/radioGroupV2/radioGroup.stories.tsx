import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup, RadioGroupItem } from './'

const meta = {
  argTypes: {
    onValueChange: { action: 'value' },
  },
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const RadioGroupV2: Story = {
  args: {
    children: (
      <>
        <RadioGroupItem
          disabled={false}
          id={'q1'}
          label={'RadioGroup'}
          value={'ReactNode1'}
          variant={'Body 2'}
        />
        <RadioGroupItem
          disabled={false}
          id={'q2'}
          label={'RadioGroup'}
          value={'ReactNode2'}
          variant={'Body 2'}
        />
      </>
    ),
    defaultValue: 'ReactNode1',
    disabled: false,
  },
}
