import * as React from 'react'

import { Typography, VariantType } from '@/common/components/typography'
import * as SelectPrimitive from '@radix-ui/react-select'

import s from './selectV2.module.scss'

type OwnerProps = {
  disabled: boolean
  placeholder: string
  theme?: 'dark' | null
  typography: VariantType
  width?: string
}
export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  OwnerProps & React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ disabled, placeholder, theme, typography, width = '', ...props }, ref) => {
  const placeholderValue = (
    <Typography theme={theme} variant={typography}>
      <span className={disabled ? s.disabled : ''}>{placeholder}</span>
    </Typography>
  )

  return (
    <SelectPrimitive.Trigger
      className={`${disabled && s.disabled} ${s.selectTrigger}`}
      disabled={disabled}
      ref={ref}
      style={{ width: width }}
      {...props}
    >
      <SelectPrimitive.Value placeholder={placeholderValue} />
    </SelectPrimitive.Trigger>
  )
})

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName
