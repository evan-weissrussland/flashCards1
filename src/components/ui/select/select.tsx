import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { Typography, VariantType } from '@/components/ui/typography'
import * as Select from '@radix-ui/react-select'

import s from './select.module.scss'

export type SelectProps<T extends ElementType = 'button'> = {
  as?: T
  children?: ReactNode
  className?: string
  disabled?: boolean
  variant?: VariantType
} & ComponentPropsWithoutRef<T>

export const SelectComponent = <T extends ElementType = 'button'>(
  props: SelectProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof SelectProps<T>>
) => {
  const {
    as: Component = 'button',
    children,
    className = '',
    disabled = false,
    variant = 'Body 2',
    ...rest
  } = props
  const placeholderValue = (
    <Typography variant={variant}>
      <span className={disabled ? s.disabled : ''}>Select-box</span>
    </Typography>
  )

  return (
    <div style={{ display: 'inline-block' }}>
      <Typography variant={'Body 2'}>
        <span className={`${disabled && s.disabled} ${s.spanLabel}`}>Select-box</span>
      </Typography>
      <Select.Root disabled={disabled}>
        <Select.Trigger
          className={`${disabled && s.disabled} ${s.selectTrigger}`}
          disabled={disabled}
        >
          <Select.Value placeholder={placeholderValue} />
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={s.selectContent}>
            <Select.Item
              className={`${s.selectItem} ${disabled && s.disabled}`}
              disabled
              value={'dsv1'}
            >
              <Select.ItemText>
                <Typography variant={variant}>ssgsdg</Typography>
              </Select.ItemText>
            </Select.Item>
            <Select.Item className={s.selectItem} value={'dfssgbadb'}>
              <Select.ItemText>
                <Typography variant={variant}>wef</Typography>
              </Select.ItemText>
            </Select.Item>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

//TODO 1. Нужно использовать Select.ItemText; 2. Чтобы при раскрытии item'ов выбранный item не перекрывал trigger, нужно удалить Select.Viewport
