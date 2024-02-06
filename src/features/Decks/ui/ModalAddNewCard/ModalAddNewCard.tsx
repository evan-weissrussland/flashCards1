import { FC, memo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/common/components/button'
import { Input } from '@/common/components/input'
import {
  Modalka,
  ModalkaButtonCancel,
  ModalkaContent,
  ModalkaTrigger,
} from '@/common/components/modal'
import { Typography } from '@/common/components/typography'
import { CloseModal } from '@/common/icons/CloseModal'
import { useCreateCardMutation } from '@/features/Decks/api/getDecks'
import { modalSchema } from '@/features/Decks/ui/ModalAddNewCard/modal-schema'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './modalAddNewCard.module.scss'

import { FormValues } from './types'

type Props = {
  deckId: string
}

export const ModalAddNewCard: FC<Props> = memo(({ deckId }) => {
  //хук useState для управления open/close AlertDialog.Root. Нужен для того, чтобы модалка закрывалась после передачи на сервер данных из формы, иначе она просто закрывается и данные не передаются
  const [open, setOpen] = useState(false)

  //хук из RTK Query для выполнения запроса POST создания новой карты
  const [createCard] = useCreateCardMutation()

  //обработка форм
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(modalSchema),
  })

  //обработчик передачи данных из формы на сервер. Обязательно через formData (у Андрея на серваке так сделано)
  const onSubmit = async (data: FormValues) => {
    const formData = new FormData()

    console.log(data)
    formData.append('question', data.question)
    formData.append('answer', data.answer)

    if (Object.keys(data.imageQuestion).length) {
      formData.append('questionImg', data.imageQuestion[0])
    }
    if (Object.keys(data.imageAnswer).length) {
      formData.append('answerImg', data.imageAnswer[0])
    }
    try {
      await createCard({ args: formData, id: deckId })
      setOpen(false)
      reset()
    } catch (e: any) {
      console.error('error to add deck')
    }
  }

  return (
    <Modalka onOpenChange={setOpen} open={open}>
      <ModalkaTrigger asChild>
        <Button>Add New Card</Button>
      </ModalkaTrigger>
      <ModalkaContent>
        <div className={s.description}>
          <Typography variant={'H3'}>Add new Card</Typography>
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
                {...register('question')}
                error={errors.question?.message}
                label={'Question'}
                placeholder={'Name'}
              />
            </div>
            <div>
              <label>
                <input {...register('imageQuestion')} style={{ display: 'none' }} type={'file'} />
                <Button as={'span'} fullWidth icon={'uploadImage'} variant={'secondary'}>
                  Change image
                </Button>
              </label>
            </div>
            <div>
              <Input
                {...register('answer')}
                error={errors.question?.message}
                label={'Answer'}
                placeholder={'Name'}
              />
            </div>
            <div>
              <label>
                <input {...register('imageAnswer')} style={{ display: 'none' }} type={'file'} />
                <Button as={'span'} fullWidth icon={'uploadImage'} variant={'secondary'}>
                  Change image
                </Button>
              </label>
            </div>
          </div>
          <div className={s.buttonGroup}>
            <ModalkaButtonCancel asChild>
              <Button variant={'secondary'}>Cancel</Button>
            </ModalkaButtonCancel>
            <Button type={'submit'}>Add New Card</Button>
          </div>
        </form>
      </ModalkaContent>
    </Modalka>
  )
})
