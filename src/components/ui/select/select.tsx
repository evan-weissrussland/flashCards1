import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { Typography, VariantType } from '@/components/ui/typography'
import * as Select from '@radix-ui/react-select'

import s from './select.module.scss'

export type SelectProps<T extends ElementType = 'button'> = {
  as?: T
  callback?: (value: string) => void
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
    callback,
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

  const containerWithAttribute = document.getElementById('div-select')

  return (
    <>
      <div style={{ display: 'inline-block' }}>
        <Typography variant={'Body 2'}>
          <span className={`${disabled && s.disabled} ${s.spanLabel}`}>Select-box</span>
        </Typography>

        <Select.Root disabled={disabled} onValueChange={callback}>
          <Select.Trigger
            className={`${disabled && s.disabled} ${s.selectTrigger}`}
            disabled={disabled}
          >
            <Select.Value placeholder={placeholderValue} />
          </Select.Trigger>

          <Select.Portal container={containerWithAttribute}>
            <Select.Content className={s.selectContent}>
              <Select.Item className={s.selectItem} disabled={disabled} value={'dsv1'}>
                <Select.ItemText>
                  <Typography dataColor={disabled} variant={variant}>
                    <span className={s.itemText}>s123sgsdg</span>
                  </Typography>
                </Select.ItemText>
              </Select.Item>
              <Select.Item className={s.selectItem} value={'dfssgbadb'}>
                <Select.ItemText>
                  <Typography dataColor={disabled} variant={variant}>
                    <span className={s.itemText}>5aS6789</span>
                  </Typography>
                </Select.ItemText>
              </Select.Item>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <div id={'div-select'}></div>
    </>
  )
}

//TODO 1. Нужно использовать Select.ItemText; 2. Чтобы при раскрытии item'ов выбранный item не перекрывал trigger, нужно удалить Select.Viewport. 3. Не знаю, как без прямого обращения к DOM, сделать выпадающий список. По-умолчанию он переносится в конец всего документа, что неудобно. 4. Также не знаю, как сделать высоту пунктов выпадающего меню такой же, как и у Trigger.
