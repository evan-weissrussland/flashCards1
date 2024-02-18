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
import { useUpdateCardMutation } from '@/features/Decks/api/getDecks'
import { modalSchema } from '@/features/Decks/ui/ModalEditCard/modal-schema'
import { zodResolver } from '@hookform/resolvers/zod'

import s from '@/features/Decks/ui/ModalAddNewCard/modalAddNewCard.module.scss'

import { FormValues } from './types'

type Props = {
  answer: string
  answerImg: string
  idCard: string
  question: string
  questionImg: string
}

export const ModalEditCard: FC<Props> = memo(
  ({ answer, answerImg, idCard, question, questionImg }) => {
    //хук useState для управления open/close AlertDialog.Root. Нужен для того, чтобы модалка закрывалась после передачи на сервер данных из формы, иначе она просто закрывается и данные не передаются
    const [open, setOpen] = useState(false)

    //стэйт для сохранения картинки вопроса (question). Нужен для отображения картинки из пропсов или при загрузке с ПК.
    const [avaQuestion, setAvaQuestion] = useState<string | undefined>(questionImg)

    //стэйт для сохранения картинки ответа (answer). Нужен для отображения картинки  из пропсов или при загрузке с ПК.
    const [avaAnswer, setAvaAnswer] = useState<string | undefined>(answerImg)

    //хук из RTK Query для выполнения запроса PATCH редактирования карты
    const [updateCard] = useUpdateCardMutation()

    //обработка и валидация форм
    const {
      formState: { errors },
      handleSubmit,
      register,
    } = useForm<FormValues>({
      resolver: zodResolver(modalSchema),
    })
    /**
     * обработчик передачи данных из формы на сервер. Обязательно через formData (у Андрея на серваке так сделано). При успешном запросе на сервер закрываем окно модалки.
     * Если картинка загружена с ПК, то она для отправки на сервер берётся из data, если же оставляем картинку старую, то она берётся из стэйта
     * @param data - объект данных из полей формы: инпут вопроса, инпут ответа, картинки вопрсоаи ответа
     */
    const onSubmit = async (data: FormValues) => {
      const formData = new FormData()

      formData.append('question', data.question)
      formData.append('answer', data.answer)

      if (Object.keys(data.imageQuestion).length) {
        formData.append('questionImg', data.imageQuestion[0])
      } else {
        formData.append('questionImg', '')
      }
      if (Object.keys(data.imageAnswer).length) {
        formData.append('answerImg', data.imageAnswer[0])
      } else {
        formData.append('answerImg', '')
      }
      try {
        await updateCard({ args: formData, id: idCard })
        setOpen(false)
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
          <Button className={'padding4px'} icon={'edit'} variant={'secondary'} />
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
                  {...register('question', { value: question })}
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
                  {...register('answer', { value: answer })}
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
                <Button variant={'secondary'}>Cancel</Button>
              </ModalkaButtonCancel>
              <Button type={'submit'}>Edit Card</Button>
            </div>
          </form>
        </ModalkaContent>
      </Modalka>
    )
  }
)
