import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './card.module.scss'

export type ButtonProps<T extends ElementType = 'div'> = {
  as?: T
  border?: boolean
  className?: string
} & ComponentPropsWithoutRef<T>

export const Card = <T extends ElementType = 'div'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const { as: Component = 'div', className = '', ...rest } = props

  return <Component className={`${s.card} ${s[className]} ${rest.border && s.border}`} {...rest} />
}
