import {
  ComponentPropsWithoutRef,
  ElementType,
  FC,
  ReactNode,
  RefAttributes,
  forwardRef,
} from 'react'

import { Typography, VariantType } from '@/components/ui/typography'
import * as Select from '@radix-ui/react-select'
import { SelectItemProps } from '@radix-ui/react-select'

import s from './select.module.scss'

import IntrinsicAttributes = React.JSX.IntrinsicAttributes

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
    variant = 'Body 1',
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
            <Select.ScrollUpButton />
            <Select.Viewport className={s.selectViewport}>
              <Select.Item className={s.selectItem} value={'dsv1'}>
                <Typography variant={variant}>ssgsdg</Typography>
                <Select.ItemText>
                  <Typography variant={variant}>ssgsdg</Typography>
                </Select.ItemText>
              </Select.Item>
              <Select.Item className={s.selectItem} value={'dfssgbadb'}>
                <Typography variant={variant}>dfssgbadb</Typography>
              </Select.Item>
              <Select.Item className={s.selectItem} value={'dsv3'}>
                <Typography variant={variant}>djrtjadb</Typography>
              </Select.Item>
            </Select.Viewport>
            <Select.ScrollDownButton />
            <Select.Arrow />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

/*type SelectItemType = {
  children?: ReactNode
  value: string
} & IntrinsicAttributes &
  SelectItemProps &
  RefAttributes<HTMLDivElement>

const SelectItem: FC<SelectItemType> = forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <Select.Item className={s.selectItem} {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  )
})*/

//TODO не знаю как сделать селект. По стилизации вроде всё совпадает, то при выборе из меню селекта, селект схлопывается.
