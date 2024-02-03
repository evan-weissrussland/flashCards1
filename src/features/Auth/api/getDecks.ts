import { PageSizeType } from '@/common/components/paginator/paginator'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Response = {
  items: Deck[]
  maxCardsCount: number
  pagination: {
    currentPage: number
    itemsPerPage: PageSizeType
    totalItems: number
    totalPages: number
  }
}
type Deck = {
  author: {
    id: string
    name: string
  }
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: true
  name: string
  updated: string
  userId: string
}

type GetDecksRequestType = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: string
}

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: builder => {
    return {
      createDeck: builder.mutation<any, CreateDeckRequestType>({
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
      getDecks: builder.query<Response, GetDecksRequestType>({
        query: args => ({
          params: args ? args : undefined,
          url: `v2/decks`,
        }),
      }),
      getMinMaxAmoundCards: builder.query<{ max: number; min: number }, void>({
        query: () => `v2/decks/min-max-cards`,
      }),
    }
  },
  reducerPath: 'baseApi',
})

export const { useCreateDeckMutation, useGetDecksQuery, useGetMinMaxAmoundCardsQuery } = baseApi

type CreateDeckRequestType = {
  cover?: any
  isPrivate?: boolean
  name: string
}
