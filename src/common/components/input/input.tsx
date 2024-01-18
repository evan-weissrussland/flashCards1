import { ComponentPropsWithoutRef, ElementType, ForwardedRef, ReactNode, forwardRef } from 'react'

import s from './input.module.scss'

export type InputProps<T extends ElementType = 'input'> = {
  as?: T
  callback?: (inputData: string) => void
  className?: string
  error?: string
  label?: string
  // placeholder?: string
  type?: string
}
/**
 * обобщённая типизация с родительскими пропсами, а также с нативными пропсами, исключая из нативных пропсов те, которые есть в родительских
 */
type OwnerInputProps<T extends ElementType = 'input'> = InputProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof InputProps<T>>

type InputWithRef = <T extends ElementType = 'input'>(
  props: OwnerInputProps<T>,
  ref: ForwardedRef<T>
) => ReactNode

export const Input: InputWithRef = forwardRef(
  <T extends ElementType = 'input'>(props: OwnerInputProps<T>, ref: ForwardedRef<T>) => {
    const {
      as = 'input',
      callback,
      className = '',
      error = '',
      label = 'input',
      type = 'text',
      ...rest
    } = props
    const Component: ElementType = as || 'input'

    return (
      <div className={s.inputWrapper}>
        <span className={`${s.label} ${rest.disabled && s.disabledLabel}`}>{label}</span>
        <Component
          className={`${s[type]} ${s.input} ${s[className]} ${error && s.error}`}
          onChange={(e: { currentTarget: { value: any } }) => e.currentTarget.value}
          ref={ref}
          type={type === 'search' ? 'text' : type}
          {...rest}
        />
        <span className={s.errorText}>{error && `${error}!`}</span>
      </div>
    )
  }
)