import { NavLink, useParams } from 'react-router-dom'

import { ErrorData } from '@/app/model/types'
import { Spinner } from '@/app/ui/Spinner/Spinner'
import { Typography } from '@/common/components/typography'
import { ArrowBackIcon } from '@/common/icons/ArrowBackIcon'
import { useGetDeckQuery } from '@/features/Decks/api/getDecks'
import { FriendsDeck } from '@/features/Decks/ui/Deck/FriendsDeck/FriendsDeck'
import { MyDeck } from '@/features/Decks/ui/Deck/MyDeck/MyDeck'
import { useAuthContext } from '@/hooks/hooks'

import s from './deck.module.scss'

export const Deck = () => {
  //мой id юзера из контекста (Арр)
  const { myId } = useAuthContext()
  //вытягиваем id выбраннйо колоды из строки URL
  const params = useParams()

  //делаем запрос на сервер за выбранной колодой
  const { data, error, isFetching } = useGetDeckQuery(params.id ?? '')

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

  if (!data || isFetching) {
    return <Spinner />
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
          {myId === data?.userId ? (
            <MyDeck
              cardsCount={data.cardsCount}
              cover={data.cover}
              deckId={data.id}
              isPrivate={data.isPrivate}
              name={data.name}
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
      <span>{narrowingError}</span>
    </>
  )
}
