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
      createDeck: builder.mutation<Deck, FormData>({
        invalidatesTags: ['Deck'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
      deleteDeck: builder.mutation<Omit<Deck, 'author'>, string>({
        invalidatesTags: ['Deck'],
        query: id => ({
          method: 'DELETE',
          url: `v1/decks/${id}`,
        }),
      }),
      getDecks: builder.query<Response, GetDecksRequestType>({
        providesTags: ['Deck'],
        query: args => ({
          params: args ? args : undefined,
          url: `v2/decks`,
        }),
      }),
      getMinMaxAmoundCards: builder.query<{ max: number; min: number }, void>({
        query: () => `v2/decks/min-max-cards`,
      }),
      updateDeck: builder.mutation<Deck, { args: FormData; id: string }>({
        invalidatesTags: ['Deck'],
        query: body => ({
          body: body.args,
          method: 'PATCH',
          url: `v1/decks/${body.id}`,
        }),
      }),
    }
  },
  reducerPath: 'baseApi',
  tagTypes: ['Deck'],
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxAmoundCardsQuery,
  useUpdateDeckMutation,
} = baseApi
