import { useContext } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { Context } from '@/app/ui/App'
import { Typography } from '@/common/components/typography'
import { ArrowBackIcon } from '@/common/icons/ArrowBackIcon'
import { useGetDeckQuery } from '@/features/Decks/api/getDecks'
import { FriendsDeck } from '@/features/Decks/ui/Deck/FriendsDeck/FriendsDeck'
import { MyDeck } from '@/features/Decks/ui/Deck/MyDeck/MyDeck'

import s from './deck.module.scss'

export const Deck = () => {
  //мой id юзера из контекста (Арр)
  const resultIdAuthMe = useContext(Context)
  //вытягиваем id выбраннйо колоды из строки URL
  const params = useParams()
  //делаем запрос на сервер за выбранной колодой
  const { data, isLoading } = useGetDeckQuery(params.id ?? '')

  // пока идёт запрос на сервер показываем заглушку
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
          <MyDeck
            cardsCount={data?.cardsCount}
            cover={data?.cover}
            deckId={data?.id}
            isPrivate={data?.isPrivate}
            name={data?.name}
          />
        ) : (
          <FriendsDeck
            cardsCount={data?.cardsCount as number}
            cover={data?.cover as string}
            deckId={data?.id as string}
            name={data?.name as string}
          />
        )}
      </div>
    </div>
  )
}
