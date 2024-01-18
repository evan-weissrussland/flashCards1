import { FC, ReactNode } from 'react'

import { Typography, VariantType } from '@/common/components/typography'
import * as SelectPrimitive from '@radix-ui/react-select'

import s from './selectV2.module.scss'

type OwnerProps = {
  children: ReactNode
  defaultValue?: string
  disabled: boolean
  label?: string
  onValueChange: (v: string) => void
  typography: VariantType
}
export const Select: FC<OwnerProps> = ({
  disabled,
  label,
  onValueChange,
  typography,
  ...props
}) => {
  return (
    <div className={s.div} style={{ display: 'inline-block' }}>
      <Typography variant={typography}>
        <span className={`${disabled && s.disabled} ${s.spanLabel}`}>{label}</span>
      </Typography>
      <SelectPrimitive.Root disabled={disabled} onValueChange={onValueChange} {...props} />
    </div>
  )
}
