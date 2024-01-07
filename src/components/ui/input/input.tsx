import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './input.module.scss'

export type ButtonProps<T extends ElementType = 'input'> = {
  as?: T
  className?: string
  error?: string
  type?: string
} & ComponentPropsWithoutRef<T>

export const Input = <T extends ElementType = 'input'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const { as: Component = 'input', className = '', error = '', type = 'text', ...rest } = props

  return (
    <div className={s.inputWrapper}>
      <span className={`${s.label} ${rest.disabled && s.disabledLabel}`}>input</span>
      <div className={`${s[`type-${type}`]} ${rest.disabled && s.disabled}`}>
        <Component
          className={`${s[type]} ${s.input} ${s[className]} ${error && s.error}`}
          type={type === 'search' ? 'text' : type}
          {...rest}
        />
      </div>
      <span className={s.errorText}>{error && `${error}!`}</span>
    </div>
  )
}
