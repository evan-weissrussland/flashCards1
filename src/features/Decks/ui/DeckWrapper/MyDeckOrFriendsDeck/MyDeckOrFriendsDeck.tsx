import { FC, memo, useState } from 'react'

import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Typography } from '@/common/components/typography'
import { TableDeck } from '@/features/Decks/ui/DeckWrapper/TableDeck/TableDeck'
import { ModalAddNewCard } from '@/features/Decks/ui/ModalAddNewCard'
import { ModalLearnToDeck } from '@/features/Decks/ui/ModalLearnToDeck'
import { DropDownMyDeck } from '@/features/DropDownMyDeck'

type Props = {
  cardsCount: number
  cover: string
  deckId: string
  isMyDeck: boolean
  isPrivate: boolean
  name: string
}

export const MyDeckOrFriendsDeck: FC<Props> = memo(props => {
  const { cardsCount, cover, deckId, isMyDeck, isPrivate, name } = props
  //стэйт отображения или сокрытия модалки LearnDeck
  const [isLearn, setIsLearn] = useState(false)

  return (
    <>
      {!isLearn ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <Typography variant={'H1'}>{name}</Typography>
              {cardsCount && isMyDeck ? (
                <DropDownMyDeck
                  deckCover={cover}
                  deckId={deckId}
                  isPrivate={isPrivate}
                  name={name}
                  setIsLearn={setIsLearn}
                />
              ) : (
                <></>
              )}
            </div>
            {!isMyDeck && (
              <Button
                onClick={() => {
                  setIsLearn(true)
                }}
              >
                Learn to deck
              </Button>
            )}
            {cardsCount && isMyDeck ? <ModalAddNewCard deckId={deckId} /> : <></>}
          </div>

          {cardsCount ? <TableDeck cover={cover} deckId={deckId} isMyDeck={isMyDeck} /> : <></>}

          {!cardsCount && isMyDeck && (
            <div style={{ paddingTop: '60px' }}>
              <Card className={'EmptyDeck'}>
                <Typography variant={'Body 1'}>
                  This pack is empty. Click add new card to fill this pack
                </Typography>
                <ModalAddNewCard deckId={deckId} />
              </Card>
            </div>
          )}
        </>
      ) : (
        <ModalLearnToDeck deckId={deckId} name={name} />
      )}
    </>
  )
})
