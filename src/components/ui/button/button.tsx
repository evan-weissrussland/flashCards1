import { ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef } from 'react'

import s from './button.module.scss'

/**
 * типизация родительских пропсов
 */
export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  className?: string
  fullWidth?: boolean
  onClick?: () => void
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
}
/**
 * обощённая типизация с родительскими пропсами, а ткже с нативными пропсами, исключая из нативных пропсов те, которые есть в родительских
 */
type OwnerButtonProps<T extends ElementType = 'button'> = ButtonProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>

export const Button = forwardRef(
  <T extends ElementType>(props: OwnerButtonProps<T>, ref: ForwardedRef<T>) => {
    const { as, className = '', fullWidth, onClick, variant = 'primary', ...rest } = props

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
      />
    )
  }
)
//TODO у меня не получились кнопки в размер по дизайну (длина отличается на 1px). Также я не нашёл шрифт Helvetica
Button.displayName = 'Button1'
