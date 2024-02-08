import { useState } from 'react'

import {
  DropDown,
  DropDownContent,
  DropDownGroup,
  DropDownItem,
  DropDownTrigger,
} from '@/common/components/dropV2'
import { Typography } from '@/common/components/typography'
import { DeleteIcon } from '@/common/icons/DeleteIcon'
import { DropDownMyDeckIcon } from '@/common/icons/DropDownMyDeck'
import { EditIcon } from '@/common/icons/EditIcon'
import { PlayIcon } from '@/common/icons/PlayIcon'
import { ModalDeleteDeck } from '@/features/Decks/ui/ModalDeleteDeck'

type Props = {
  deckId: string
  name: string
}

export const DropDownMyDeck = ({ deckId, name }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <DropDown onOpenChange={setOpen} open={open}>
      <DropDownTrigger>
        <div style={{ display: 'inline-flex', justifyContent: 'start' }}>
          <DropDownMyDeckIcon />
        </div>
      </DropDownTrigger>

      <DropDownContent align={'end'} alignOffset={-10} sideOffset={0}>
        <div>
          <DropDownGroup>
            <DropDownItem>
              <PlayIcon />
              <Typography theme={'dark'} variant={'Caption'}>
                Learn
              </Typography>
            </DropDownItem>
            <DropDownItem>
              <EditIcon />
              <Typography theme={'dark'} variant={'Caption'}>
                Edit
              </Typography>
            </DropDownItem>
            <DropDownItem>
              <ModalDeleteDeck deckName={name} idDeck={deckId} setOpenDropDown={setOpen}>
                <div style={{ alignItems: 'center', display: 'inline-flex', gap: '6px' }}>
                  <DeleteIcon />
                  <Typography theme={'dark'} variant={'Caption'}>
                    Delete
                  </Typography>
                </div>
              </ModalDeleteDeck>
            </DropDownItem>
          </DropDownGroup>
        </div>
      </DropDownContent>
    </DropDown>
  )
}
