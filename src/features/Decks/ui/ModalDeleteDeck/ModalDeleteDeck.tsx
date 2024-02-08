import { FC, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/common/components/button'
import {
  Modalka,
  ModalkaButtonCancel,
  ModalkaContent,
  ModalkaTrigger,
} from '@/common/components/modal'
import { Typography } from '@/common/components/typography'
import { CloseModal } from '@/common/icons/CloseModal'
import { useDeleteDeckMutation } from '@/features/Decks/api/getDecks'

import s from './modalDeleteDeck.module.scss'

type DeckProps = {
  children: ReactNode
  deckName: string
  idDeck: string
  setOpenDropDown: (open: boolean) => void
}

export const ModalDeleteDeck: FC<DeckProps> = ({ children, deckName, idDeck, setOpenDropDown }) => {
  const navigate = useNavigate()
  //хук useState для управления open/close AlertDialog.Root. Нужен для того, чтобы модалка закрывалась после передачи на сервер данных из формы, иначе она просто закрывается и данные не передаются
  const [open, setOpen] = useState(false)

  //хук из RTK Query для выполнения запроса DELETE удаления  колоды
  const [deleteDeck] = useDeleteDeckMutation()

  const onClickDeleteHandler = () => {
    deleteDeck(idDeck)
      .unwrap()
      .then(() => {
        setOpen(false)
        navigate('/decks')
      })
  }

  return (
    <Modalka onOpenChange={setOpen} open={open}>
      <ModalkaTrigger asChild>{children}</ModalkaTrigger>
      <ModalkaContent>
        <div className={s.description}>
          <Typography variant={'H3'}>Delete Deck</Typography>
          <ModalkaButtonCancel asChild>
            <Button
              className={'padding4px'}
              onClick={() => setOpenDropDown(false)}
              variant={'secondary'}
            >
              <CloseModal />
            </Button>
          </ModalkaButtonCancel>
        </div>
        <div className={s.descriptionText}>
          <Typography variant={'Body 1'}>
            Do you really want to remove{' '}
            <Typography as={'span'} variant={'Subtitle 1'}>
              {deckName}
            </Typography>
            .
          </Typography>
          <Typography variant={'Body 1'}>All cards will be deleted</Typography>
        </div>
        <div className={s.buttonGroup}>
          <ModalkaButtonCancel asChild>
            <Button onClick={() => setOpenDropDown(false)} variant={'secondary'}>
              Cancel
            </Button>
          </ModalkaButtonCancel>
          <Button onClick={onClickDeleteHandler}>Delete Deck</Button>
        </div>
      </ModalkaContent>
    </Modalka>
  )
}
