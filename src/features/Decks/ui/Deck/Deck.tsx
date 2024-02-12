import { NavLink, useParams } from 'react-router-dom'

import { ErrorData } from '@/app/model/types'
import { Typography } from '@/common/components/typography'
import { ArrowBackIcon } from '@/common/icons/ArrowBackIcon'
import { useAuthMeQuery } from '@/features/Auth/api/authMe-api'
import { useGetDeckQuery } from '@/features/Decks/api/getDecks'
import { FriendsDeck } from '@/features/Decks/ui/Deck/FriendsDeck/FriendsDeck'
import { MyDeck } from '@/features/Decks/ui/Deck/MyDeck/MyDeck'

import s from './deck.module.scss'

export const Deck = () => {
  //мой id юзера из контекста (Арр)
  const { data: meData } = useAuthMeQuery()
  //вытягиваем id выбраннйо колоды из строки URL
  const params = useParams()

  //делаем запрос на сервер за выбранной колодой
  const { data, error, isLoading } = useGetDeckQuery(params.id ?? '')

  // пока идёт запрос на сервер показываем заглушку
  if (isLoading) {
    return <>....read Data....</>
  }

  //переменная, которой будет присвоена ошибка из хука RTKQ. Выводим её паользователю
  let narrowingError

  //определение типа ошибки из RTKQ: если есть свойство status в объекте error, то тип error - FetchBaseQueryError, иначе тип - SerializedError. Дополнительно протипизировал объект data, иначе при обращении к свойству data.message появляется ошибка
  if (error) {
    if ('status' in error) {
      const errorDate = error.data as ErrorData

      narrowingError = errorDate.message
    } else {
      narrowingError = error.message
    }
  }

  if (!meData || !data) {
    return null
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '33px', padding: '0 136px' }}>
        <div>
          <NavLink className={s.navLink} to={'/decks'}>
            <ArrowBackIcon /> <Typography variant={'Body 2'}>Back to Deck List</Typography>
          </NavLink>
        </div>
        <div>
          {meData.id === data.userId ? (
            <MyDeck
              cardsCount={data.cardsCount}
              cover={data.cover}
              deckId={data.id}
              isPrivate={data.isPrivate}
              name={data.name}
            />
          ) : (
            <FriendsDeck
              cardsCount={data.cardsCount}
              cover={data.cover}
              deckId={data.id}
              name={data.name}
            />
          )}
        </div>
      </div>
      <span>{narrowingError}</span>
    </>
  )
}
