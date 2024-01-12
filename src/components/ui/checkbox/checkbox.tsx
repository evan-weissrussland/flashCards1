import React, { FC } from 'react'

import { Typography, VariantType } from '@/components/ui/typography'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Label from '@radix-ui/react-label'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  callback?: (checked: 'indeterminate' | boolean) => void
  checked?: boolean
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  variant?: VariantType
}

export const CheckboxComponent: FC<CheckboxProps> = props => {
  const {
    callback,
    checked = false,
    children = '',
    className = '',
    disabled = false,
    variant = 'Body 2',
  } = props

  return (
    <form action={'get'}>
      <div className={s.checkWrapper}>
        <Checkbox.Root
          className={`${s.checkbox} ${disabled && s.disabled}`}
          disabled={disabled}
          id={'check1'}
          onCheckedChange={callback}
        ></Checkbox.Root>
        <Typography variant={variant}>
          <Label.Root
            className={`${s.label} ${disabled ? s.labelDisabled : ''}`}
            htmlFor={'check1'}
          >
            {children}
          </Label.Root>
        </Typography>
      </div>
    </form>
  )
}
//TODO почти заработало.
// 1 Нужно было обернуть в тег form. Но теперь непонятно, как в сторибуке отразить все состояния, ведь для этого нужно будет задать атрибут checked. Но если мы его зададим, то чекбокс станет управляемым и переключаться в браузере не будет.
// 2 Также не получилось сделать серый фон при нажатии на label, только при нажатии на сам чекбокс.
