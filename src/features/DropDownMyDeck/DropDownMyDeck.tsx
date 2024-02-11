import { useState } from 'react'

import { Typography } from '@/common/components/typography'
import { DeleteIcon } from '@/common/icons/DeleteIcon'
import { DropDownMyDeckIcon } from '@/common/icons/DropDownMyDeck'
import { EditIcon } from '@/common/icons/EditIcon'
import { PlayIcon } from '@/common/icons/PlayIcon'
import { ModalDeleteDeck } from '@/features/Decks/ui/ModalDeleteDeck'
import { ModalEditDeck } from '@/features/Decks/ui/ModalEditDeck'

import {
  DropDown,
  DropDownContent,
  DropDownGroup,
  DropDownItem,
  DropDownTrigger,
} from '../../common/components/dropDown'

type Props = {
  deckCover: string
  deckId: string
  isPrivate: boolean
  name: string
}

export const DropDownMyDeck = ({ deckCover, deckId, isPrivate, name }: Props) => {
  //открыть/закрыть модальнео окно DropDown
  const [open, setOpen] = useState(false)
  //показать/скрыть модальные окна Delete Deck, Edit Deck, Learn Deck
  const [isModalEditOrModalDeleteShow, setIsModalEditOrModalDeleteOrModalLearnShow] = useState<
    '' | 'delete' | 'edit' | 'learn'
  >('')

  return (
    <>
      <DropDown onOpenChange={setOpen} open={open}>
        <DropDownTrigger>
          <div style={{ display: 'inline-flex', justifyContent: 'start' }}>
            <DropDownMyDeckIcon />
          </div>
        </DropDownTrigger>
        <DropDownContent align={'end'} alignOffset={-10} sideOffset={0}>
          <div>
            <DropDownGroup>
              <DropDownItem
                onclick={() => {
                  setOpen(false)
                }}
              >
                <PlayIcon />
                <Typography theme={'dark'} variant={'Caption'}>
                  Learn
                </Typography>
              </DropDownItem>
              <DropDownItem
                onclick={() => {
                  setIsModalEditOrModalDeleteOrModalLearnShow('edit')
                  setOpen(false)
                }}
              >
                <div style={{ alignItems: 'center', display: 'inline-flex', gap: '6px' }}>
                  <EditIcon />
                  <Typography theme={'dark'} variant={'Caption'}>
                    Edit
                  </Typography>
                </div>
              </DropDownItem>
              <DropDownItem
                onclick={() => {
                  setIsModalEditOrModalDeleteOrModalLearnShow('delete')
                  setOpen(false)
                }}
              >
                <div style={{ alignItems: 'center', display: 'inline-flex', gap: '6px' }}>
                  <DeleteIcon />
                  <Typography theme={'dark'} variant={'Caption'}>
                    Delete
                  </Typography>
                </div>
              </DropDownItem>
            </DropDownGroup>
          </div>
        </DropDownContent>
      </DropDown>

      {isModalEditOrModalDeleteShow === 'edit' ? (
        <ModalEditDeck
          deckCover={deckCover}
          deckId={deckId}
          deckIsPrivate={isPrivate}
          deckName={name}
          isModeEdit={!!isModalEditOrModalDeleteShow}
          setIsModeEdit={setIsModalEditOrModalDeleteOrModalLearnShow}
        />
      ) : (
        ''
      )}

      {isModalEditOrModalDeleteShow === 'delete' ? (
        <ModalDeleteDeck
          deckName={name}
          idDeck={deckId}
          isModeDelete={!!isModalEditOrModalDeleteShow}
          setIsModeDelete={setIsModalEditOrModalDeleteOrModalLearnShow}
        />
      ) : (
        ''
      )}
    </>
  )
}
