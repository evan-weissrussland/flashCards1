import { FC, ReactNode, memo, useCallback, useState } from 'react'
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
import { CloseModal } from '@/common/icons/CloseModal'
import { useUpdateDeckMutation } from '@/features/Decks/api/getDecks'
import { modalSchema } from '@/features/Decks/ui/ModalAddNewDeck/modal-schema'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './modalEditDeck.module.scss'

import { FormValues } from './types'

type Props = {
  children?: ReactNode
  deckCover: string
  deckId: string
  deckIsPrivate: boolean
  deckName: string
  isModeEdit?: boolean
  setIsModeEdit?: (v: '' | 'delete' | 'edit' | 'learn') => void
}

export const ModalEditDeck: FC<Props> = memo(
  ({ children, deckCover, deckId, deckIsPrivate, deckName, isModeEdit = false, setIsModeEdit }) => {
    //хук useState для управления open/close AlertDialog.Root. Нужен для того, чтобы модалка закрывалась после передачи на сервер данных из формы, иначе она просто закрывается и данные не передаются
    const [open, setOpen] = useState(isModeEdit)

    //стэйт для сохранения картинки колоды. Нужен для отображения картинки из пропсов или при загрузке с ПК.
    const [imgCover, setImgCover] = useState(deckCover)

    //хук из RTK Query для выполнения запроса PATCH изменения колоды
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

    /**
     * обработчик передачи данных из формы на сервер. Обязательно через formData (у Андрея на серваке так сделано). При успешном запросе на сервер закрываем окно модалки и измененияем флаг отображения данной компоненты в родителе (setIsModeEdit)
     * Если картинка загружена с ПК, то она для отправки на сервер берётся из data, если же оставляем картинку старую, то она берётся из стэйта
     * @param data - объект данных из полей формы: инпут вопроса, инпут ответа, картинки вопрсоаи ответа
     */
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
        setIsModeEdit && setIsModeEdit('')
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

    //обработчик загрузки картинки колоды
    const uploadImageDeck = useCallback((file: File) => {
      if (file) {
        const reader = new FileReader()

        reader.onloadend = () => {
          setImgCover(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }, [])

    return (
      <Modalka onOpenChange={setOpen} open={open}>
        <ModalkaTrigger asChild>{children}</ModalkaTrigger>
        <ModalkaContent>
          <div className={s.description}>
            <Typography variant={'H3'}>Edit deck</Typography>
            <ModalkaButtonCancel asChild>
              <Button
                className={'padding4px'}
                onClick={() => setIsModeEdit && setIsModeEdit('')}
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
                  {...register('namePack', { value: deckName })}
                  error={errors.namePack?.message}
                  label={'Name Pack'}
                  placeholder={'Name'}
                />
              </div>
              <img alt={''} src={imgCover} width={'100px'} />
              <div>
                <label>
                  <input
                    {...register('image', {
                      onChange: e => {
                        if (e.target.files && e.target.files.length) {
                          uploadImageDeck(e.target.files[0])
                        }
                      },
                    })}
                    style={{ display: 'none' }}
                    type={'file'}
                  />
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
                  // value={'on'}
                  variant={'Body 2'}
                >
                  Private pack
                </CheckboxComponent>
              </div>
            </div>
            <div className={s.buttonGroup}>
              <ModalkaButtonCancel asChild>
                <Button onClick={() => setIsModeEdit && setIsModeEdit('')} variant={'secondary'}>
                  Cancel
                </Button>
              </ModalkaButtonCancel>
              <Button type={'submit'}>Edit Deck</Button>
            </div>
          </form>
        </ModalkaContent>
      </Modalka>
    )
  }
)
