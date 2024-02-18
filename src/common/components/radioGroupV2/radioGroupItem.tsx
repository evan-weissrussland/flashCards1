import * as React from 'react'
import { memo } from 'react'

import { Typography, VariantType } from '@/common/components/typography'
import * as Label from '@radix-ui/react-label'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import s from './radioGroupItem.module.scss'

export const RadioGroupItem = memo(
  React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    { label: string; theme?: 'dark' | null; variant: VariantType } & React.ComponentPropsWithoutRef<
      typeof RadioGroupPrimitive.Item
    >
  >((props, ref) => {
    return (
      <div className={s.divItem}>
        <RadioGroupPrimitive.Item className={s.RadioGroupItem} ref={ref} {...props}>
          <RadioGroupPrimitive.Indicator className={s.RadioGroupIndicator} />
        </RadioGroupPrimitive.Item>
        <Typography theme={props.theme} variant={props.variant}>
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
)
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName
