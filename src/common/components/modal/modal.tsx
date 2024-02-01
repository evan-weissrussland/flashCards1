import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from 'react'
import { useController, useForm } from 'react-hook-form'

import { Button } from '@/common/components/button'
import { CheckboxComponent } from '@/common/components/checkbox'
import { Input } from '@/common/components/input'
import { modalSchema } from '@/common/components/modal/modal-schema'
import { Typography } from '@/common/components/typography'
import { CloseModal } from '@/common/icons/icons'
import { useCreateDeckMutation } from '@/features/Auth/api/getDecks'
import { zodResolver } from '@hookform/resolvers/zod'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

import s from './modal.module.scss'

import { FormValues } from './types'

export const Modalka = forwardRef<
  ElementRef<typeof AlertDialog.Root>,
  ComponentPropsWithoutRef<typeof AlertDialog.Root>
>((props, ref) => {
  //хук useState для управления open/close AlertDialog.Root. Нужен для того, чтобы модалка закрывалась после передачи на сервер данных из формы, иначе она просто закрывается и данные не передаются
  const [open, setOpen] = useState(false)

  //хук из RTK Query для выполнения запроса POST создания новой колоды
  const [createDeck] = useCreateDeckMutation()

  //обработка форм
  const {
    control,
    formState: {},
    handleSubmit,
    register,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(modalSchema),
  })

  //обработчик передачи данных из формы на сервер
  const onSubmit = async (data: FormValues) => {
    try {
      await createDeck({ cover: undefined, isPrivate: data.privatePack, name: data.namePack })
      setOpen(false)
      reset()
    } catch (e: any) {
      console.error('error to add deck')
    }
  }

  //для чекбокса
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue: false,
    name: 'privatePack',
  })

  return (
    <AlertDialog.Root onOpenChange={setOpen} open={open}>
      <ModalkaTrigger>
        <Button>Add New Deck</Button>
      </ModalkaTrigger>
      <ModalkaContent>
        <div className={s.description}>
          <Typography variant={'H3'}>Add new deck</Typography>
          <AlertDialog.Cancel asChild>
            <Button className={'padding4px'} variant={'secondary'}>
              <CloseModal />
            </Button>
          </AlertDialog.Cancel>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.formDiv}>
            <div>
              <Input {...register('namePack')} label={'Name Pack'} placeholder={'Name'} />
            </div>
            <div>Upload Image</div>
            <div>
              <CheckboxComponent
                checked={value}
                id={'Private-pack'}
                name={'privatePack'}
                onCheckedChange={onChange}
                theme={'dark'}
                value={'on'}
                variant={'Body 2'}
              >
                Private pack
              </CheckboxComponent>
            </div>
          </div>
          <div className={s.buttonGroup}>
            <AlertDialog.Cancel asChild>
              <Button variant={'secondary'}>Cancel</Button>
            </AlertDialog.Cancel>
            <Button type={'submit'}>Add New Pack</Button>
          </div>
        </form>
      </ModalkaContent>
    </AlertDialog.Root>
  )
})

export type OwnerModalTriggerProps = {
  className?: string
}

export const ModalkaTrigger = forwardRef<
  ElementRef<typeof AlertDialog.Trigger>,
  ComponentPropsWithoutRef<typeof AlertDialog.Trigger> & OwnerModalTriggerProps
>((props, ref) => {
  const { children } = props

  return (
    <AlertDialog.Trigger asChild ref={ref}>
      {children}
    </AlertDialog.Trigger>
  )
})

export type OwnerModalContentProps = {
  cancelTitle?: string
  className?: string
}

export const ModalkaContent = forwardRef<
  ElementRef<typeof AlertDialog.Root>,
  ComponentPropsWithoutRef<typeof AlertDialog.Root> & OwnerModalContentProps
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
