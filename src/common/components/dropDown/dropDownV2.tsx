import * as React from 'react'
import { ComponentPropsWithoutRef, FC, ForwardedRef, ReactNode, forwardRef, memo } from 'react'

import { VariantType } from '@/common/components/typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropDownV2.module.scss'

export const DropDown: FC<React.ComponentPropsWithoutRef<typeof DropdownMenu.Root>> = memo(
  ({ children, ...rest }) => {
    return <DropdownMenu.Root {...rest}>{children}</DropdownMenu.Root>
  }
)

//компонент портал и контент
type DropDownContentProps = {
  children: ReactNode
  disabled?: boolean
  label?: string
  typography?: VariantType
}

export const DropDownContent = memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenu.Content>,
    React.ComponentPropsWithoutRef<typeof DropdownMenu.Content> & DropDownContentProps
  >(({ children, className = '', disabled, label, typography = 'Body 2', ...props }, ref) => (
    <DropdownMenu.Portal>
      <DropdownMenu.Content className={clsx(s.dropDownContent, s[className])} ref={ref} {...props}>
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  ))
)

//компонент триггер
type DropDownTriggerProps = {
  children?: ReactNode
  className?: string
}

type OwnerDropDownTriggerProps = DropDownTriggerProps &
  Omit<ComponentPropsWithoutRef<any>, keyof DropDownTriggerProps>

type DropDownTriggerWithRef = (
  props: OwnerDropDownTriggerProps,
  ref: ForwardedRef<any>
) => ReactNode
export const DropDownTrigger: DropDownTriggerWithRef = memo(
  forwardRef((props: OwnerDropDownTriggerProps, ref: ForwardedRef<any>) => {
    const { children } = props

    return (
      <DropdownMenu.Trigger asChild className={s.dropDownTrigger} ref={ref}>
        {children}
      </DropdownMenu.Trigger>
    )
  })
)

//компонент label
type DropDownLabelProps = {
  children?: ReactNode
  className?: string
}

type OwnerDropDownLabelProps = DropDownLabelProps &
  Omit<ComponentPropsWithoutRef<any>, keyof DropDownLabelProps>

type DropDownLabelWithRef = (props: OwnerDropDownLabelProps, ref: ForwardedRef<any>) => ReactNode
export const DropDownLabel: DropDownLabelWithRef = memo(
  forwardRef((props: OwnerDropDownLabelProps, ref: ForwardedRef<any>) => {
    const { children } = props

    return (
      <DropdownMenu.Label className={s.dropDownLabel} ref={ref}>
        {children}
      </DropdownMenu.Label>
    )
  })
)

//компонент Group
type DropDownGroupProps = {
  children?: ReactNode
  className?: string
}

type OwnerDropDownGroupProps = DropDownGroupProps &
  Omit<ComponentPropsWithoutRef<any>, keyof DropDownGroupProps>

type DropDownGroupWithRef = (props: OwnerDropDownGroupProps, ref: ForwardedRef<any>) => ReactNode
export const DropDownGroup: DropDownGroupWithRef = memo(
  forwardRef((props: OwnerDropDownGroupProps, ref: ForwardedRef<any>) => {
    const { children } = props

    return (
      <DropdownMenu.Group className={s.dropDownGroup} ref={ref}>
        {children}
      </DropdownMenu.Group>
    )
  })
)

//компонент Item
type DropDownItemProps = {
  children?: ReactNode
  className?: string
  onclick?: () => void
}

type OwnerDropDownItemProps = DropDownItemProps &
  Omit<ComponentPropsWithoutRef<any>, keyof DropDownItemProps>

type DropDownItemWithRef = (props: OwnerDropDownItemProps, ref: ForwardedRef<any>) => ReactNode
export const DropDownItem: DropDownItemWithRef = memo(
  forwardRef((props: OwnerDropDownItemProps, ref: ForwardedRef<any>) => {
    const { children, onclick } = props

    return (
      <DropdownMenu.Item
        className={s.dropDownItem}
        onSelect={e => {
          e.preventDefault()
          onclick && onclick()
        }}
        ref={ref}
      >
        {children}
      </DropdownMenu.Item>
    )
  })
)
