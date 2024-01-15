import * as React from 'react'

import { Typography, VariantType } from '@/components/ui/typography'
import * as SelectPrimitive from '@radix-ui/react-select'

import s from '@/components/ui/selectV2/selectV2.module.scss'

type OwnerProps = {
  typography: VariantType
}
export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  OwnerProps & React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, className, disabled, typography, ...props }, ref) => (
  <SelectPrimitive.Item className={s.selectItem} ref={ref} {...props}>
    <SelectPrimitive.ItemText>
      <Typography dataColor={disabled} variant={typography}>
        <span className={s.itemText}>{children}</span>
      </Typography>
    </SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))

SelectItem.displayName = SelectPrimitive.Item.displayName
