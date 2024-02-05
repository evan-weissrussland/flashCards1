import { useContext } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { Context } from '@/app/ui/App'
import { Typography } from '@/common/components/typography'
import { ArrowBackIcon } from '@/common/icons/icons'
import { useGetDeckQuery } from '@/features/Decks/api/getDecks'
import { FriendsDeck } from '@/features/Decks/ui/Deck/FriendsDeck/FriendsDeck'
import { MyDeck } from '@/features/Decks/ui/Deck/MyDeck/MyDeck'

import s from './deck.module.scss'

export const Deck = () => {
  const resultIdAuthMe = useContext(Context)
  const params = useParams()
  const { data, isLoading } = useGetDeckQuery(params.id ?? '')

  if (isLoading) {
    return <>....read Data....</>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '33px', padding: '0 136px' }}>
      <div>
        <NavLink className={s.navLink} to={'/decks'}>
          <ArrowBackIcon /> <Typography variant={'Body 2'}>Back to Deck List</Typography>
        </NavLink>
      </div>
      <div>
        {resultIdAuthMe === data?.userId ? (
          <MyDeck cardsCount={data?.cardsCount} deckId={data?.id} name={data?.name} />
        ) : (
          <FriendsDeck />
        )}
      </div>
    </div>
  )
}
