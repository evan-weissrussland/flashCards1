import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  memo,
  useCallback,
  useState,
} from 'react'
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
import { UploadImageIcon } from '@/common/icons/UploadImageIcon'
import { useCreateDeckMutation } from '@/features/Decks/api/getDecks'
import { modalSchema } from '@/features/Decks/ui/ModalAddNewDeck/modal-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

import s from './modalAddNewDeck.module.scss'

import { FormValues } from './types'

export const ModalAddNewDeck = memo(
  forwardRef<
    ElementRef<typeof AlertDialog.Root>,
    ComponentPropsWithoutRef<typeof AlertDialog.Root>
  >(() => {
    //хук useState для управления open/close AlertDialog.Root. Нужен для того, чтобы модалка закрывалась после передачи на сервер данных из формы, иначе она просто закрывается и данные не передаются
    const [open, setOpen] = useState(false)

    //стэйт для сохранения картинки колоды. Нужен для отображения картинки в модалке при её загрузке с диска ПК.
    const [deckCover, setDeckCover] = useState<string | undefined>(undefined)

    //хук из RTK Query для выполнения запроса POST создания новой колоды
    const [createDeck] = useCreateDeckMutation()

    //обработка и валидация формы
    const {
      control,
      formState: { errors },
      handleSubmit,
      register,
      reset,
    } = useForm<FormValues>({
      resolver: zodResolver(modalSchema),
    })

    //обработчик передачи данных из формы на сервер. Обязательно через formData (у Андрея на серваке так сделано). При успешном запросе на сервер закрываем окно модалки, зачищаем поля формы
    const onSubmit = async (data: FormValues) => {
      const formData = new FormData()

      formData.append('name', data.namePack)
      formData.append('isPrivate', data.privatePack.toString())

      if (Object.keys(data.image).length) {
        formData.append('cover', data.image[0])
      }
      try {
        await createDeck(formData)
        setOpen(false)
        setDeckCover(undefined)
        reset()
      } catch (e: any) {
        console.error('error to add deck')
      }
    }

    //для связи между кастомным чекбоксом и хукщм useForm
    const {
      field: { onChange, value },
    } = useController({
      control,
      defaultValue: false,
      name: 'privatePack',
    })

    //обработчик загрузки картинки колоды
    const uploadDeckImage = useCallback((file: File) => {
      if (file) {
        const reader = new FileReader()

        reader.onloadend = () => {
          setDeckCover(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }, [])

    return (
      <Modalka onOpenChange={setOpen} open={open}>
        <ModalkaTrigger asChild>
          <Button>Add New Deck</Button>
        </ModalkaTrigger>
        <ModalkaContent>
          <div className={s.description}>
            <Typography variant={'H3'}>Add new deck</Typography>
            <ModalkaButtonCancel asChild>
              <Button
                className={'padding4px'}
                onClick={() => {
                  reset()
                  setDeckCover(undefined)
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
                  {...register('namePack')}
                  error={errors.namePack?.message}
                  label={'Name Pack'}
                  placeholder={'Name'}
                />
              </div>
              <div>
                <img alt={''} src={deckCover} />
              </div>
              <div>
                <label>
                  <input
                    {...register('image', {
                      onChange: e => {
                        if (e.target.files && e.target.files.length) {
                          uploadDeckImage(e.target.files[0])
                        }
                      },
                    })}
                    style={{ display: 'none' }}
                    type={'file'}
                  />
                  <Button as={'span'} fullWidth icon={<UploadImageIcon />} variant={'secondary'}>
                    Upload image
                  </Button>
                </label>
              </div>
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
              <ModalkaButtonCancel asChild>
                <Button
                  onClick={() => {
                    reset()
                    setDeckCover(undefined)
                  }}
                  variant={'secondary'}
                >
                  Cancel
                </Button>
              </ModalkaButtonCancel>
              <Button type={'submit'}>Add New Pack</Button>
            </div>
          </form>
        </ModalkaContent>
      </Modalka>
    )
  })
)
