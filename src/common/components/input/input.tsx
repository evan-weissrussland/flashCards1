import {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardedRef,
  ReactNode,
  forwardRef,
  memo,
} from 'react'

import clsx from 'clsx'

import s from './input.module.scss'

export type InputProps<T extends ElementType = 'input'> = {
  as?: T
  callback?: (inputData: string) => void
  className?: string
  error?: string
  label?: string
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

export const Input: InputWithRef = memo(
  forwardRef(<T extends ElementType = 'input'>(props: OwnerInputProps<T>, ref: ForwardedRef<T>) => {
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
      <div className={clsx(s.inputWrapper, s[className])} style={props.style}>
        <span className={`${s.label} ${rest.disabled && s.disabledLabel}`}>{label}</span>
        <Component
          className={`${s[type]} ${s.input} ${error && s.error}`}
          onChange={(e: { currentTarget: { value: any } }) => {
            callback && callback(e.currentTarget.value)
          }}
          ref={ref}
          type={type === 'search' ? 'text' : type}
          {...rest}
        />
        <span className={s.errorText}>{error && `${error}!`}</span>
      </div>
    )
  })
)
