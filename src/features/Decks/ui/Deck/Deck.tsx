import { useContext } from 'react'
import { useParams } from 'react-router-dom'

import { Context } from '@/app/ui/App'
import { useGetDeckQuery } from '@/features/Decks/api/getDecks'

export const Deck = () => {
  const resultIdAuthMe = useContext(Context)
  const params = useParams()
  const { data, isLoading } = useGetDeckQuery(params.id ?? '')

  if (isLoading) {
    return <>....read Data....</>
  }

  console.log(data)

  return <>{resultIdAuthMe === data?.userId ? <div> Это моя колода</div> : <>это ЧУЖАЯ колода</>}</>
}
