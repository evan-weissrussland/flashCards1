import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  className?: string
  fullWidth?: boolean
  onClick?: () => void
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    as: Component = 'button',
    className = '',
    fullWidth,
    onClick,
    variant = 'primary',
    ...rest
  } = props

  return (
    <Component
      className={`${s[variant]} ${s.button} ${fullWidth ? s.fullWidth : ''} ${s[className]}`}
      onClick={onClick}
      {...rest}
    />
  )
}
//TODO  у меня не получились кнопки в размер по дизайну (длина отличается на 1px). Также я не нашёл шрифт Helvetica
