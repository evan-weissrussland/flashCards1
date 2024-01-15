import * as React from 'react'

import { Typography, VariantType } from '@/components/ui/typography'
import * as Label from '@radix-ui/react-label'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import s from '@/components/ui/radioGroupV2/radioGroupItem.module.scss'

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  { label: string; variant: VariantType } & React.ComponentPropsWithoutRef<
    typeof RadioGroupPrimitive.Item
  >
>((props, ref) => {
  return (
    <div className={s.divItem}>
      <RadioGroupPrimitive.Item className={s.RadioGroupItem} ref={ref} {...props}>
        <RadioGroupPrimitive.Indicator className={s.RadioGroupIndicator} />
      </RadioGroupPrimitive.Item>
      <Typography variant={props.variant}>
        <Label.Root
          className={`${s.label} ${props.disabled ? s.labelDisabled : ''}`}
          htmlFor={props.id}
        >
          {props.label}
        </Label.Root>
      </Typography>
    </div>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName
