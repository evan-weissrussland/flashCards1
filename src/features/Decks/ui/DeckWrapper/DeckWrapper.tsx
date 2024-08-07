import { memo } from 'react'
import Skeleton from 'react-loading-skeleton'
import { NavLink, useParams } from 'react-router-dom'

import { ErrorData } from '@/app/model/types'
import { Typography } from '@/common/components/typography'
import { ArrowBackIcon } from '@/common/icons/ArrowBackIcon'
import { useGetDeckQuery } from '@/features/Decks/api/getDecks'
import { MyDeckOrFriendsDeck } from '@/features/Decks/ui/DeckWrapper/MyDeckOrFriendsDeck/MyDeckOrFriendsDeck'
import { useAuthContext } from '@/hooks/hooks'

import 'react-loading-skeleton/dist/skeleton.css'

import s from './deck.module.scss'

const DeckWrapper = () => {
  //мой id юзера из контекста (Арр)
  const { myId } = useAuthContext()
  //вытягиваем id выбраннйо колоды из строки URL
  const params = useParams()

  //хук RTKQ для запроса на сервер за выбранной колодой
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

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '33px', padding: '0 136px' }}>
        <div>
          <NavLink className={s.navLink} to={'/decks'}>
            <ArrowBackIcon /> <Typography variant={'Body 2'}>Back to Deck List</Typography>
          </NavLink>
        </div>
        {!data || isFetching ? (
          <SkeletDeckOrFriendsDeck />
        ) : (
          <div>
            <MyDeckOrFriendsDeck
              cardsCount={data.cardsCount}
              cover={data.cover}
              deckId={data.id}
              isMyDeck={myId === data?.userId}
              isPrivate={data.isPrivate}
              name={data.name}
            />
          </div>
        )}
      </div>
      <span>{narrowingError}</span>
    </>
  )
}

//из-за использования ленивой(lazy) загрузки необходимо экспортировать компонент по дефолту!!!!
export default DeckWrapper

const SkeletDeckOrFriendsDeck = memo(() => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <Skeleton height={'36px'} width={'110px'} />
          <Skeleton height={'24px'} width={'24px'} />
        </div>
        <Skeleton height={'36px'} width={'142px'} />
      </div>
      <Skeleton height={'400px'} width={'100%'} />
    </>
  )
})
