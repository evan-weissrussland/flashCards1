import { ComponentPropsWithoutRef, ForwardedRef, ReactNode, forwardRef } from 'react'

import { Typography } from '@/common/components/typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './modal.module.scss'

/**
 * типизация родительских пропсов
 */
export type ModalProps = {
  className?: string
}
/**
 * обобщённая типизация с родительскими пропсами, а также с нативными пропсами, исключая из нативных пропсов те, которые есть в родительских
 */
type OwnerModalProps = ModalProps & Omit<ComponentPropsWithoutRef<any>, keyof ModalProps>

type DropDownWithRef = (props: OwnerModalProps, ref: ForwardedRef<any>) => ReactNode

export const DropDown: DropDownWithRef = forwardRef(
  (props: OwnerModalProps, ref: ForwardedRef<any>) => {
    return <AlertDialog.Root></AlertDialog.Root>
  }
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
export const DropDownTrigger: DropDownTriggerWithRef = forwardRef(
  (props: OwnerDropDownTriggerProps, ref: ForwardedRef<any>) => {
    const { children } = props

    return (
      <DropdownMenu.Trigger asChild className={s.dropDownTrigger} ref={ref}>
        {children}
      </DropdownMenu.Trigger>
    )
  }
)

//компонент label
type DropDownLabelProps = {
  children?: ReactNode
  className?: string
}

type OwnerDropDownLabelProps = DropDownLabelProps &
  Omit<ComponentPropsWithoutRef<any>, keyof DropDownLabelProps>

type DropDownLabelWithRef = (props: OwnerDropDownLabelProps, ref: ForwardedRef<any>) => ReactNode
export const DropDownLabel: DropDownLabelWithRef = forwardRef(
  (props: OwnerDropDownLabelProps, ref: ForwardedRef<any>) => {
    const { children } = props

    return (
      <DropdownMenu.Label className={s.dropDownLabel} ref={ref}>
        {children}
      </DropdownMenu.Label>
    )
  }
)

//компонент Group
type DropDownGroupProps = {
  children?: ReactNode
  className?: string
}

type OwnerDropDownGroupProps = DropDownGroupProps &
  Omit<ComponentPropsWithoutRef<any>, keyof DropDownGroupProps>

type DropDownGroupWithRef = (props: OwnerDropDownGroupProps, ref: ForwardedRef<any>) => ReactNode
export const DropDownGroup: DropDownGroupWithRef = forwardRef(
  (props: OwnerDropDownGroupProps, ref: ForwardedRef<any>) => {
    const { children } = props

    return (
      <DropdownMenu.Group className={s.dropDownGroup} ref={ref}>
        {children}
      </DropdownMenu.Group>
    )
  }
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
export const DropDownItem: DropDownItemWithRef = forwardRef(
  (props: OwnerDropDownItemProps, ref: ForwardedRef<any>) => {
    const { children, onclick } = props

    return (
      <DropdownMenu.Item className={s.dropDownItem} onSelect={e => onclick && onclick()} ref={ref}>
        {children}
      </DropdownMenu.Item>
    )
  }
)
