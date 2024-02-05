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
export type Deck = {
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

type GetCardsDecksRequestType = {
  answer?: string
  currentPage?: number
  itemsPerPage?: PageSizeType
  orderBy?: string
  question?: string
}

type Cards = {
  items: Card[]
  pagination: {
    currentPage: number
    itemsPerPage: PageSizeType
    totalItems: number
    totalPages: number
  }
}

type Card = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
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
      createDeck: builder.mutation<Deck, FormData>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
      deleteDeck: builder.mutation<Omit<Deck, 'author'>, string>({
        invalidatesTags: ['Decks'],
        query: id => ({
          method: 'DELETE',
          url: `v1/decks/${id}`,
        }),
      }),
      getCardsDeck: builder.query<Cards, { args: GetCardsDecksRequestType; id: string }>({
        keepUnusedDataFor: 1,
        providesTags: ['CardsDeck'],
        query: body => ({
          params: body.args ? body.args : undefined,
          url: `v1/decks/${body.id}/cards`,
        }),
      }),
      getDeck: builder.query<Deck, string>({
        keepUnusedDataFor: 1,
        providesTags: ['Deck'],
        query: id => ({
          url: `v1/decks/${id}`,
        }),
      }),
      getDecks: builder.query<Response, GetDecksRequestType>({
        keepUnusedDataFor: 1,
        providesTags: ['Decks'],
        query: args => ({
          params: args ? args : undefined,
          url: `v2/decks`,
        }),
      }),
      getMinMaxAmoundCards: builder.query<{ max: number; min: number }, void>({
        query: () => `v2/decks/min-max-cards`,
      }),
      updateDeck: builder.mutation<Deck, { args: FormData; id: string }>({
        invalidatesTags: ['Decks'],
        query: body => ({
          body: body.args,
          method: 'PATCH',
          url: `v1/decks/${body.id}`,
        }),
      }),
    }
  },
  reducerPath: 'baseApi',
  tagTypes: ['Deck', 'Decks', 'CardsDeck'],
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetCardsDeckQuery,
  useGetDeckQuery,
  useGetDecksQuery,
  useGetMinMaxAmoundCardsQuery,
  useUpdateDeckMutation,
} = baseApi
