import { Typography } from '@/components/ui/typography'
import * as Label from '@radix-ui/react-label'
import * as RadioGroup from '@radix-ui/react-radio-group'

import s from '@/components/ui/radioGroup/radioGroup.module.scss'

export type RadioGroupProps = {
  callback?: (value: string) => void
  className?: string
  disabled?: boolean
  value: string
}

export const RadioButton = (props: RadioGroupProps) => {
  const { callback, className, disabled, value } = props

  return (
    <RadioGroup.Root
      aria-label={'radio1'}
      className={s.RadioGroupRoot}
      defaultValue={'value1'}
      disabled={disabled}
      onValueChange={callback}
    >
      <div className={s.divItem}>
        <RadioGroup.Item className={s.RadioGroupItem} id={'1q'} value={'value1'}>
          <RadioGroup.Indicator className={s.RadioGroupIndicator} />
        </RadioGroup.Item>
        <Typography variant={'Body 2'}>
          <Label.Root className={`${s.label} ${disabled ? s.labelDisabled : ''}`} htmlFor={'1q'}>
            {value}
          </Label.Root>
        </Typography>
      </div>
      <div className={s.divItem}>
        <RadioGroup.Item className={s.RadioGroupItem} id={'2q'} value={'value2'}>
          <RadioGroup.Indicator className={s.RadioGroupIndicator} />
        </RadioGroup.Item>
        <Typography variant={'Body 2'}>
          <Label.Root className={`${s.label} ${disabled ? s.labelDisabled : ''}`} htmlFor={'2q'}>
            {value}
          </Label.Root>
        </Typography>
      </div>
    </RadioGroup.Root>
  )
}
