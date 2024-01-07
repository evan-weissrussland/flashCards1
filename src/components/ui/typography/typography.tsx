import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './typography.module.scss'

export type TypographyProps<T extends ElementType = 'div'> = {
  as?: T
  className?: string
  href?: string
  variant:
    | 'Body 1'
    | 'Body 2'
    | 'Caption'
    | 'H1'
    | 'H2'
    | 'H3'
    | 'Large'
    | 'Link 1'
    | 'Link 2'
    | 'Overline'
    | 'Subtitle 1'
    | 'Subtitle 2'
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'div'>(
  props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>
) => {
  const { as: Component = 'div', children, className = '', variant, ...rest } = props
  const typeFromVariant = variant.replace(/\s/, '').toLowerCase()

  return (
    <Component className={`${s[className]} ${s[typeFromVariant]}`} {...rest}>
      {children}
    </Component>
  )
}
