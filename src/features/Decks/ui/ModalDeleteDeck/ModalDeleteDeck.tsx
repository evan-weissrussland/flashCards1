import { FC, useState } from 'react'

import { Button } from '@/common/components/button'
import {
  Modalka,
  ModalkaButtonCancel,
  ModalkaContent,
  ModalkaTrigger,
} from '@/common/components/modal'
import { Typography } from '@/common/components/typography'
import { CloseModal } from '@/common/icons/icons'
import { useDeleteDeckMutation } from '@/features/Auth/api/getDecks'

import s from './modalDeleteDeck.module.scss'

type DeckProps = {
  deckName: string
  idDeck: string
}

export const ModalDeleteDeck: FC<DeckProps> = ({ deckName, idDeck }) => {
  //хук useState для управления open/close AlertDialog.Root. Нужен для того, чтобы модалка закрывалась после передачи на сервер данных из формы, иначе она просто закрывается и данные не передаются
  const [open, setOpen] = useState(false)

  //хук из RTK Query для выполнения запроса POST создания новой колоды
  const [deleteDeck] = useDeleteDeckMutation()

  const onClickDeleteHandler = () => {
    deleteDeck(idDeck)
      .unwrap()
      .then(() => setOpen(false))
  }

  return (
    <Modalka onOpenChange={setOpen} open={open}>
      <ModalkaTrigger asChild>
        <Button className={'padding4px'} icon={'delete'} variant={'secondary'} />
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
            <Button variant={'secondary'}>Cancel</Button>
          </ModalkaButtonCancel>
          <Button onClick={onClickDeleteHandler}>Delete Deck</Button>
        </div>
      </ModalkaContent>
    </Modalka>
  )
}