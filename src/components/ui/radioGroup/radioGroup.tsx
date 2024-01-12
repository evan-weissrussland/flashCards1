import React from 'react'

import { Typography } from '@/components/ui/typography'
import * as Label from '@radix-ui/react-label'
import * as RadioGroup from '@radix-ui/react-radio-group'

import s from '@/components/ui/radioGroup/radioGroup.module.scss'

export type RadioGroupProps = {
  callback?: (value: string) => void
  children: ChildrenType
  className?: string
  defaultValue?: string
  disabled?: boolean
}
type ChildrenType = {
  child: { id: string; label: string; value: string }[]
}

export const RadioButton = (props: RadioGroupProps) => {
  const { callback, children, className = '', defaultValue, disabled } = props

  const arrayItems = children.child.map((e, i) => (
    <div className={s.divItem} key={i}>
      <RadioGroup.Item className={s.RadioGroupItem} id={e.id} value={e.value}>
        <RadioGroup.Indicator className={s.RadioGroupIndicator} />
      </RadioGroup.Item>
      <Typography variant={'Body 2'}>
        <Label.Root className={`${s.label} ${disabled ? s.labelDisabled : ''}`} htmlFor={e.id}>
          {e.label}
        </Label.Root>
      </Typography>
    </div>
  ))

  return (
    <RadioGroup.Root
      aria-label={'radio1'}
      className={`${s[className]} ${s.RadioGroupRoot}`}
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={callback}
    >
      {arrayItems}
    </RadioGroup.Root>
  )
}
