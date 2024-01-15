import * as React from 'react'

import * as SelectPrimitive from '@radix-ui/react-select'

import s from '@/components/ui/select/select.module.scss'

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={s.selectContent}
      collisionPadding={0}
      position={'popper'}
      ref={ref}
      {...props}
    >
      <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))

SelectContent.displayName = SelectPrimitive.Content.displayName
