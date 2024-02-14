import { FC, useState } from 'react'

import { Button } from '@/common/components/button'
import { Typography } from '@/common/components/typography'
import { FriendsDeckMain } from '@/features/Decks/ui/Deck/FriendsDeck/FriendsDeckMain/FriendsDeckMain'
import { ModalLearnToDeck } from '@/features/Decks/ui/ModalLearnToDeck'

type Props = {
  cardsCount: number
  cover: string
  deckId: string
  name: string
}

export const FriendsDeck: FC<Props> = props => {
  const { cover, deckId, name } = props
  const [isLearn, setIsLearn] = useState(false)

  return (
    <div>
      {!isLearn ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <Typography variant={'H1'}>{name}</Typography>
            </div>

            <Button
              onClick={() => {
                setIsLearn(true)
              }}
            >
              Learn to deck
            </Button>
          </div>
          <FriendsDeckMain cover={cover} deckId={deckId} />
        </>
      ) : (
        <ModalLearnToDeck deckId={deckId} name={name} />
      )}
    </div>
  )
}
