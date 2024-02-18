import { ComponentPropsWithoutRef, ElementRef, FC, ReactNode, forwardRef, memo } from 'react'

import * as AlertDialog from '@radix-ui/react-alert-dialog'

import s from './modal.module.scss'

type OwnerModalProps = {
  children: ReactNode
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const Modalka: FC<OwnerModalProps> = memo(props => {
  const { children, onOpenChange, open } = props

  return (
    <AlertDialog.Root onOpenChange={onOpenChange} open={open}>
      {children}
    </AlertDialog.Root>
  )
})

export type OwnerModalTriggerProps = {
  className?: string
}

export const ModalkaTrigger = memo(
  forwardRef<
    ElementRef<typeof AlertDialog.Trigger>,
    ComponentPropsWithoutRef<typeof AlertDialog.Trigger> & OwnerModalTriggerProps
  >((props, ref) => {
    const { asChild, children } = props

    return (
      <AlertDialog.Trigger asChild={asChild} ref={ref}>
        {children}
      </AlertDialog.Trigger>
    )
  })
)

export type OwnerModalContentProps = {
  cancelTitle?: string
  className?: string
}

export const ModalkaContent = memo(
  forwardRef<
    ElementRef<typeof AlertDialog.Content>,
    ComponentPropsWithoutRef<typeof AlertDialog.Content> & OwnerModalContentProps
  >((props, ref) => {
    const { children } = props

    return (
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={s.overlay} />
        <AlertDialog.Content className={s.content} ref={ref}>
          {children}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    )
  })
)

export type OwnerModalButtonCancelProps = {
  cancelTitle?: string
  className?: string
}

export const ModalkaButtonCancel = memo(
  forwardRef<
    ElementRef<typeof AlertDialog.Cancel>,
    ComponentPropsWithoutRef<typeof AlertDialog.Cancel> & OwnerModalButtonCancelProps
  >((props, ref) => {
    const { asChild, children } = props

    return (
      <AlertDialog.Cancel asChild={asChild} ref={ref}>
        {children}
      </AlertDialog.Cancel>
    )
  })
)
