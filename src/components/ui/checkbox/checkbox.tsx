import { FC } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
}

export const CheckboxComponent: FC<CheckboxProps> = props => {
  const { checked, className = '', disabled = false } = props

  return (
    <Checkbox.Root
      checked={checked}
      className={`${s.checkbox} ${disabled && s.disabled}`}
      disabled={disabled}
      id={'check1'}
    >
      <Checkbox.Indicator className={`${checked && s.checked} ${disabled && s.disabled}`} />
    </Checkbox.Root>
  )
}
