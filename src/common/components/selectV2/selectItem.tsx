import * as React from 'react'
import { memo } from 'react'

import { Typography, VariantType } from '@/common/components/typography'
import * as SelectPrimitive from '@radix-ui/react-select'

import s from './selectV2.module.scss'

type OwnerProps = {
  theme?: 'dark' | null
  typography: VariantType
}
export const SelectItem = memo(
  React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    OwnerProps & React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
  >(({ children, className, disabled, theme, typography, ...props }, ref) => (
    <SelectPrimitive.Item className={s.selectItem} ref={ref} {...props}>
      <SelectPrimitive.ItemText>
        <Typography dataColor={disabled} theme={theme} variant={typography}>
          <span className={s.itemText}>{children}</span>
        </Typography>
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  ))
)

SelectItem.displayName = SelectPrimitive.Item.displayName
