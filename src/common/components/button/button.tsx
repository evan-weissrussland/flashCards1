import {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardedRef,
  ReactNode,
  forwardRef,
  memo,
} from 'react'

import { DeleteIcon } from '@/common/icons/DeleteIcon'
import { EditIcon } from '@/common/icons/EditIcon'
import { LogOutIcon } from '@/common/icons/LogOutIcon'
import { UploadImageIcon } from '@/common/icons/UploadImageIcon'

import s from './button.module.scss'

/**
 * типизация родительских пропсов
 */
export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  className?: string
  fullWidth?: boolean
  icon?: 'delete' | 'edit' | 'logout' | 'uploadImage'
  onClick?: () => void
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
}
/**
 * обобщённая типизация с родительскими пропсами, а также с нативными пропсами, исключая из нативных пропсов те, которые есть в родительских
 */
type OwnerButtonProps<T extends ElementType = 'button'> = ButtonProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>

type ButtonWithRef = <T extends ElementType = 'button'>(
  props: OwnerButtonProps<T>,
  ref: ForwardedRef<T>
) => ReactNode

export const Button: ButtonWithRef = memo(
  forwardRef(<T extends ElementType>(props: OwnerButtonProps<T>, ref: ForwardedRef<T>) => {
    const {
      as = 'button',
      children,
      className = '',
      fullWidth,
      icon,
      onClick,
      variant = 'primary',
      ...rest
    } = props

    /**
     * тэг HTML, передаваемый из родителя. По-умолчанию 'button'. Можем передать и ссылку 'a'
     */
    const Component: ElementType = as || 'button'

    return (
      <Component
        className={`${s[variant]} ${s.button} ${fullWidth ? s.fullWidth : ''} ${s[className]}`}
        onClick={onClick}
        ref={ref}
        {...rest}
      >
        {icon === 'logout' && <LogOutIcon disabled={rest.disabled} />}
        {icon === 'delete' && <DeleteIcon />}
        {icon === 'uploadImage' && <UploadImageIcon />}
        {icon === 'edit' && <EditIcon />}
        {children}
      </Component>
    )
  })
)
