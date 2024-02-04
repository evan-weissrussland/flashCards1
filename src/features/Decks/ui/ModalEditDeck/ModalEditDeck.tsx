import { FC, useState } from 'react'
import { useController, useForm } from 'react-hook-form'

import { Button } from '@/common/components/button'
import { CheckboxComponent } from '@/common/components/checkbox'
import { Input } from '@/common/components/input'
import {
  Modalka,
  ModalkaButtonCancel,
  ModalkaContent,
  ModalkaTrigger,
} from '@/common/components/modal'
import { Typography } from '@/common/components/typography'
import { CloseModal } from '@/common/icons/icons'
import { useUpdateDeckMutation } from '@/features/Decks/api/getDecks'
import { modalSchema } from '@/features/Decks/ui/ModalAddNewDeck/modal-schema'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './modalEditDeck.module.scss'

import { FormValues } from './types'

type Props = {
  deckCover: string
  deckId: string
  deckIsPrivate: boolean
  deckName: string
}

export const ModalEditDeck: FC<Props> = ({ deckCover, deckId, deckIsPrivate, deckName }) => {
  //хук useState для управления open/close AlertDialog.Root. Нужен для того, чтобы модалка закрывалась после передачи на сервер данных из формы, иначе она просто закрывается и данные не передаются
  const [open, setOpen] = useState(false)

  //хук из RTK Query для выполнения запроса POST создания новой колоды
  const [updateDeck] = useUpdateDeckMutation()
  //обработка форм
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(modalSchema),
  })

  //обработчик передачи данных из формы на сервер. Обязательно через formData (у Андрея на серваке так сделано)
  const onSubmit = async (data: FormValues) => {
    const formData = new FormData()

    formData.append('name', data.namePack)
    formData.append('isPrivate', data.privatePack.toString())

    if (Object.keys(data.image).length) {
      formData.append('cover', data.image[0])
    } else {
      formData.append('cover', deckCover)
    }
    try {
      await updateDeck({ args: formData, id: deckId })
      setOpen(false)
    } catch (e: any) {
      console.error('error to add deck')
    }
  }

  //для связи между кастомным чекбоксом и хукщм useForm
  const {
    field: { name, onChange, value = deckIsPrivate },
  } = useController({
    control,
    name: 'privatePack',
  })

  return (
    <Modalka onOpenChange={setOpen} open={open}>
      <ModalkaTrigger asChild>
        <Button className={'padding4px'} icon={'edit'} variant={'secondary'} />
      </ModalkaTrigger>
      <ModalkaContent>
        <div className={s.description}>
          <Typography variant={'H3'}>Add new deck</Typography>
          <ModalkaButtonCancel asChild>
            <Button className={'padding4px'} variant={'secondary'}>
              <CloseModal />
            </Button>
          </ModalkaButtonCancel>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.formDiv}>
            <div>
              <Input
                {...register('namePack', { value: deckName })}
                error={errors.namePack?.message}
                label={'Name Pack'}
                placeholder={'Name'}
              />
            </div>
            <div>
              <label>
                <input {...register('image')} style={{ display: 'none' }} type={'file'} />
                <Button as={'span'} fullWidth icon={'uploadImage'} variant={'secondary'}>
                  Upload image
                </Button>
              </label>
            </div>
            <div>
              <CheckboxComponent
                checked={value}
                id={'Private-pack'}
                name={name}
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
            <ModalkaButtonCancel asChild>
              <Button variant={'secondary'}>Cancel</Button>
            </ModalkaButtonCancel>
            <Button type={'submit'}>Add New Pack</Button>
          </div>
        </form>
      </ModalkaContent>
    </Modalka>
  )
}
