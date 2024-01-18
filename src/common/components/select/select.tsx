import { FC, ReactNode } from 'react'

import { Typography, VariantType } from '@/common/components/typography'
import * as Select from '@radix-ui/react-select'

import s from './select.module.scss'

export type SelectProps = {
  callback?: (value: string) => void
  children?: ReactNode
  className?: string
  disabled?: boolean
  theme?: 'dark' | null
  variant?: VariantType
}

export const SelectComponent: FC<SelectProps> = props => {
  const { callback, disabled = false, theme, variant = 'Body 2' } = props
  const placeholderValue = (
    <Typography theme={theme} variant={variant}>
      <span className={disabled ? s.disabled : ''}>Select-box</span>
    </Typography>
  )

  return (
    <>
      <div className={s.div} style={{ display: 'inline-block' }}>
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

          <Select.Portal>
            <Select.Content className={s.selectContent} collisionPadding={0} position={'popper'}>
              <Select.Viewport>
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
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </>
  )
}
