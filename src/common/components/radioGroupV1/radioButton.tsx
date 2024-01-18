import { Typography } from '@/common/components/typography'
import * as Label from '@radix-ui/react-label'
import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radioButton.module.scss'

export type RadioGroupProps = {
  callback?: (value: string) => void
  className?: string
  defaultValue?: string
  disabled?: boolean
  state: ChildrenType[]
  theme?: 'dark' | null
}
type ChildrenType = { id: string; label: string; value: string }

export const RadioButton = (props: RadioGroupProps) => {
  const { callback, className = '', defaultValue, disabled, state, theme } = props

  const arrayItems = state.map((e, i) => (
    <div className={s.divItem} key={i}>
      <RadioGroup.Item className={s.RadioGroupItem} id={e.id} value={e.value}>
        <RadioGroup.Indicator className={s.RadioGroupIndicator} />
      </RadioGroup.Item>
      <Typography theme={theme} variant={'Body 2'}>
        <Label.Root className={`${s.label} ${disabled ? s.labelDisabled : ''}`} htmlFor={e.id}>
          {e.label}
        </Label.Root>
      </Typography>
    </div>
  ))

  return (
    <RadioGroup.Root
      aria-label={'radio1'}
      className={`${s[className]} ${s.RadioGroupRoot}`}
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={callback}
    >
      {arrayItems}
    </RadioGroup.Root>
  )
}
