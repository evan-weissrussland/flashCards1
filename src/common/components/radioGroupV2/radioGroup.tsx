import * as React from 'react'
import { memo } from 'react'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

export const RadioGroup = memo(
  React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
  >(({ className, ...props }, ref) => {
    return <RadioGroupPrimitive.Root className={s.RadioGroupRoot} {...props} ref={ref} />
  })
)

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName
