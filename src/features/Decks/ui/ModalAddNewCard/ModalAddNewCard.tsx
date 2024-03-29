import { FC, memo, useCallback, useState } from 'react'
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
  //стэйт для сохранения картинки вопроса (question). Нужен для отображения картинки в модалке при её загрузке с диска ПК.
  const [avaQuestion, setAvaQuestion] = useState<string | undefined>(undefined)
  //стэйт для сохранения картинки ответа (answer). Нужен для отображения картинки в модалке при её загрузке с диска ПК.
  const [avaAnswer, setAvaAnswer] = useState<string | undefined>(undefined)

  //хук из RTK Query для выполнения запроса POST создания новой карты
  const [createCard] = useCreateCardMutation()

  //обработка и валидация форм
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(modalSchema),
  })

  //обработчик передачи данных из формы на сервер. Обязательно через formData (у Андрея на серваке так сделано). При успешном запросе на сервер закрываем окно модалки, зачищаем поля формы, сбрысываем стэйт картинок вопрсоа и ответа
  const onSubmit = async (data: FormValues) => {
    const formData = new FormData()

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
      setAvaAnswer(undefined)
      setAvaQuestion(undefined)
    } catch (e: any) {
      console.error('error to add deck')
    }
  }
  //обработчик загрузки картинки вопроса
  const uploadImageQuestion = useCallback((file: File) => {
    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setAvaQuestion(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  //обработчик загрузки картинки ответа
  const uploadImageAnswer = useCallback((file: File) => {
    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setAvaAnswer(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  return (
    <Modalka onOpenChange={setOpen} open={open}>
      <ModalkaTrigger asChild>
        <Button>Add New Card</Button>
      </ModalkaTrigger>
      <ModalkaContent>
        <div className={s.description}>
          <Typography variant={'H3'}>Add new Card</Typography>
          <ModalkaButtonCancel asChild>
            <Button
              className={'padding4px'}
              onClick={() => {
                reset()
                setAvaAnswer(undefined)
                setAvaQuestion(undefined)
              }}
              variant={'secondary'}
            >
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
              <img alt={''} src={avaQuestion} />
            </div>
            <div>
              <label>
                <input
                  {...register('imageQuestion', {
                    onChange: e => {
                      if (e.target.files && e.target.files.length) {
                        uploadImageQuestion(e.target.files[0])
                      }
                    },
                  })}
                  style={{ display: 'none' }}
                  type={'file'}
                />
                <span style={{ color: 'red' }}>{errors.imageQuestion?.message as string}</span>
                <Button as={'span'} fullWidth icon={'uploadImage'} variant={'secondary'}>
                  Change image
                </Button>
              </label>
            </div>
            <div>
              <Input
                {...register('answer')}
                error={errors.answer?.message}
                label={'Answer'}
                placeholder={'Name'}
              />
            </div>
            <div>
              <img alt={''} src={avaAnswer} />
            </div>
            <div>
              <label>
                <input
                  {...register('imageAnswer', {
                    onChange: e => {
                      if (e.target.files && e.target.files.length) {
                        uploadImageAnswer(e.target.files[0])
                      }
                    },
                  })}
                  style={{ display: 'none' }}
                  type={'file'}
                />
                <Button as={'span'} fullWidth icon={'uploadImage'} variant={'secondary'}>
                  Change image
                </Button>
              </label>
            </div>
          </div>
          <div className={s.buttonGroup}>
            <ModalkaButtonCancel asChild>
              <Button
                onClick={() => {
                  reset()
                  setAvaAnswer(undefined)
                  setAvaQuestion(undefined)
                }}
                variant={'secondary'}
              >
                Cancel
              </Button>
            </ModalkaButtonCancel>
            <Button type={'submit'}>Add New Card</Button>
          </div>
        </form>
      </ModalkaContent>
    </Modalka>
  )
})
