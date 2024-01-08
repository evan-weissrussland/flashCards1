import { FC } from 'react'

import { Typography, VariantType } from '@/components/ui/typography'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Label from '@radix-ui/react-label'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  checked?: boolean
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  variant?: VariantType
}

export const CheckboxComponent: FC<CheckboxProps> = props => {
  const { checked, children = '', className = '', disabled = false, variant = 'Body 2' } = props

  return (
    <div className={s.checkWrapper}>
      <Checkbox.Root
        checked={checked}
        className={`${s.checkbox} ${disabled && s.disabled}`}
        disabled={disabled}
        id={'check1'}
      >
        <Checkbox.Indicator className={`${checked && s.checked} ${disabled && s.disabled}`} />
      </Checkbox.Root>
      <Typography variant={variant}>
        <Label.Root className={`${s.label} ${disabled ? s.labelDisabled : ''}`} htmlFor={'check1'}>
          {children}
        </Label.Root>
      </Typography>
    </div>
  )
}
//TODO стилистически получилось сделать, но не работает: не переключает, как нативный чекбокс. В докуменатции Radix там в примере появляется какой-то инпут. Откуда он взялся? При нажатии на чекбокс в примере меняются атрибуты aria-checked  и data-state. У меня они не меняются, а как их поменять, если в примере в документации они явно не заданы?
