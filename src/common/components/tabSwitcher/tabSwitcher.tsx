import * as React from 'react'
import { memo } from 'react'

import { Typography, VariantType } from '@/common/components/typography'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import clsx from 'clsx'

import s from './tabSwitcher.module.scss'

type OwnProps = {
  disabled?: boolean
  label?: string
  typography?: VariantType
}

export const Tabs = memo(
  React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & OwnProps
  >(({ className = '', disabled, label, typography = 'Body 2', ...props }, ref) => (
    <div className={s.div} style={{ display: 'inline-block' }}>
      <Typography variant={typography}>
        <span className={`${disabled && s.disabled} ${s.spanLabel}`}>{label}</span>
      </Typography>
      <TabsPrimitive.Root className={s[className]} ref={ref} {...props} />
    </div>
  ))
)

export const TabsList = memo(
  React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
  >(({ className = '', ...props }, ref) => (
    <TabsPrimitive.List className={clsx(s[className], s.tabList)} ref={ref} {...props} />
  ))
)

TabsList.displayName = TabsPrimitive.List.displayName

type OwnTriggerProps = {
  typography?: VariantType
}
export const TabsTrigger = memo(
  React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & OwnTriggerProps
  >(({ children, className = '', disabled, typography, ...props }, ref) => (
    <TabsPrimitive.Trigger
      className={clsx(s[className], s.trigger)}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      <Typography dataColor theme={'dark'} variant={typography}>
        <span className={clsx(s.spanTrigger, disabled && s.disabled)}>{children}</span>
      </Typography>
    </TabsPrimitive.Trigger>
  ))
)

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName
