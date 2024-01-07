import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './input.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  className?: string
  error?: string
  type?: string
  variant?: 'password' | 'search' | 'text'
} & ComponentPropsWithoutRef<T>

export const Input = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    as: Component = 'input',
    className = '',
    error = '',
    type = 'text',
    variant = 'text',
    ...rest
  } = props

  return (
    <div className={s.inputWrapper}>
      <span className={s.label}>input</span>
      <Component
        className={`${s[variant]} ${s.input} ${s[className]} ${error && s.error}`}
        {...rest}
      />
      <span className={s.errorText}>{error && `${error}!`}</span>
    </div>
  )
}
