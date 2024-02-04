import { useContext } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { Context } from '@/app/ui/App'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Typography } from '@/common/components/typography'
import { ArrowBackIcon } from '@/common/icons/icons'
import { useGetDeckQuery } from '@/features/Decks/api/getDecks'

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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant={'H1'}>{data?.name}</Typography>
      </div>
      {data?.cardsCount ? (
        <div>
          {resultIdAuthMe === data?.userId ? <div> Это моя колода</div> : <>это ЧУЖАЯ колода</>}
        </div>
      ) : (
        <Card className={'EmptyDeck'}>
          <Typography variant={'Body 1'}>
            This pack is empty. Click add new card to fill this pack
          </Typography>
          <Button>Add New Card</Button>
        </Card>
      )}
    </div>
  )
}
