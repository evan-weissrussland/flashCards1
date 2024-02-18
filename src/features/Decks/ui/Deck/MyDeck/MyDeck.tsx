import { FC, memo, useState } from 'react'

import { Card } from '@/common/components/card'
import { Typography } from '@/common/components/typography'
import { MyDeckMain } from '@/features/Decks/ui/Deck/MyDeck/MyDeckMain/MyDeckMain'
import { ModalAddNewCard } from '@/features/Decks/ui/ModalAddNewCard'
import { ModalLearnToDeck } from '@/features/Decks/ui/ModalLearnToDeck'
import { DropDownMyDeck } from '@/features/DropDownMyDeck'

type Props = {
  cardsCount: number
  cover: string
  deckId: string
  isPrivate: boolean
  name: string
}
export const MyDeck: FC<Props> = memo(props => {
  const { cardsCount, cover, deckId, isPrivate, name } = props
  //стэйт отображения или сокрытия модалки LearnDeck
  const [isLearn, setIsLearn] = useState(false)

  return (
    <>
      {!isLearn ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <Typography variant={'H1'}>{name}</Typography>
              {cardsCount ? (
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
            {cardsCount ? <ModalAddNewCard deckId={deckId} /> : <></>}
          </div>
          {cardsCount ? (
            <MyDeckMain cover={cover} deckId={deckId} />
          ) : (
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
