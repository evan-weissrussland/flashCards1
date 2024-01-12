import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './input.module.scss'

export type InputProps<T extends ElementType = 'input'> = {
  as?: T
  callback?: (inputData: string) => void
  className?: string
  error?: string
  type?: string
} & ComponentPropsWithoutRef<T>

export const Input = <T extends ElementType = 'input'>(
  props: InputProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof InputProps<T>>
) => {
  const {
    as: Component = 'input',
    callback,
    className = '',
    error = '',
    type = 'text',
    ...rest
  } = props

  return (
    <div className={s.inputWrapper}>
      <span className={`${s.label} ${rest.disabled && s.disabledLabel}`}>input</span>
      <Component
        className={`${s[type]} ${s.input} ${s[className]} ${error && s.error}`}
        onChange={e => e.currentTarget.value}
        type={type === 'search' ? 'text' : type}
        {...rest}
      />
      <span className={s.errorText}>{error && `${error}!`}</span>
    </div>
  )
}
