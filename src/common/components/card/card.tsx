import { ComponentPropsWithoutRef, ElementType, memo } from 'react'

import s from './card.module.scss'

export type CardProps<T extends ElementType = 'div'> = {
  as?: T
  border?: boolean
  className?: string
}

type OwnProps<T extends ElementType = 'div'> = CardProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof CardProps<T>>

export const Card = memo(<T extends ElementType = 'div'>(props: OwnProps<T>) => {
  const { as: Component = 'div', className = '', ...rest } = props

  return <Component className={`${s.card} ${s[className]} ${rest.border && s.border}`} {...rest} />
})
