import { ComponentPropsWithoutRef, ForwardedRef, ReactNode, forwardRef } from 'react'

import { Typography } from '@/common/components/typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropDown.module.scss'

/**
 * типизация родительских пропсов
 */
export type DropDownProps = {
  className?: string
}
/**
 * обобщённая типизация с родительскими пропсами, а также с нативными пропсами, исключая из нативных пропсов те, которые есть в родительских
 */
type OwnerDropDownProps = DropDownProps & Omit<ComponentPropsWithoutRef<any>, keyof DropDownProps>

type DropDownWithRef = (props: OwnerDropDownProps, ref: ForwardedRef<any>) => ReactNode

export const DropDown: DropDownWithRef = forwardRef(
  (props: OwnerDropDownProps, ref: ForwardedRef<any>) => {
    return (
      <DropdownMenu.Root>
        <DropDownTrigger>
          <div style={{ display: 'inline-flex', gap: '14px' }}>
            <Typography theme={'dark'} variant={'Subtitle 1'}>
              <span
                style={{
                  textDecoration: 'underline',
                  textDecorationStyle: 'dashed',
                }}
              >
                Ivan
              </span>
            </Typography>
            <img
              alt={'ava'}
              src={'../../../../public/Ellipse%201.png'}
              style={{ height: '36px', width: '36px' }}
            />
          </div>
        </DropDownTrigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align={'start'}
            alignOffset={-221}
            className={s.dropDownContent}
            sideOffset={18}
          >
            <div>
              <DropDownLabel>
                <img
                  alt={'ava'}
                  src={'../../../../public/Ellipse%201.png'}
                  style={{ height: '36px', width: '36px' }}
                />
                <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
                  <Typography theme={'dark'} variant={'Subtitle 2'}>
                    Ivan
                  </Typography>
                  <Typography dataColor variant={'Caption'}>
                    email11111111111111111111111111111
                  </Typography>
                </div>
              </DropDownLabel>
              <DropDownGroup>
                <DropDownItem>
                  <img alt={'icon'} src={'../../../../public/image/dropDown/myProfileIcon.png'} />
                  <Typography theme={'dark'} variant={'Caption'}>
                    My Profile
                  </Typography>
                </DropDownItem>
                <DropDownItem>
                  <img alt={'icon'} src={'../../../../public/image/dropDown/log-out.png'} />
                  <Typography theme={'dark'} variant={'Caption'}>
                    Sign Out
                  </Typography>
                </DropDownItem>
              </DropDownGroup>
            </div>
            <DropDownGroup>
              <DropDownItem>
                <img alt={'icon'} src={'../../../../public/image/dropDown/learn.png'} />
                <Typography theme={'dark'} variant={'Caption'}>
                  Learn
                </Typography>
              </DropDownItem>
              <DropDownItem>
                <img alt={'icon'} src={'../../../../public/image/dropDown/edit.png'} />
                <Typography theme={'dark'} variant={'Caption'}>
                  Edit
                </Typography>
              </DropDownItem>
              <DropDownItem>
                <img alt={'icon'} src={'../../../../public/image/dropDown/delete.png'} />
                <Typography theme={'dark'} variant={'Caption'}>
                  Delete
                </Typography>
              </DropDownItem>
            </DropDownGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
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
