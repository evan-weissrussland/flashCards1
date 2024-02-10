import { FC } from 'react'

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
  const { cardsCount, cover, deckId, name } = props

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <Typography variant={'H1'}>{name}</Typography>
        </div>
        <ModalLearnToDeck />
      </div>
      <FriendsDeckMain cover={cover} deckId={deckId} />
    </>
  )
}
