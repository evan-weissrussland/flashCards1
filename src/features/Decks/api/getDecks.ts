import { baseApi } from '@/app/api/base-api'
import { PageSizeType } from '@/common/components/paginator/paginator'

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

type SaveGradeCard = {
  cardId: string
  grade: GradeRating
}
export type GradeRating = 1 | 2 | 3 | 4 | 5
export const DeckService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<Omit<Card, 'grade'>, { args: FormData; id: string }>({
        invalidatesTags: ['CardsDeck'],
        query: body => ({
          body: body.args,
          method: 'POST',
          url: `v1/decks/${body.id}/cards`,
        }),
      }),
      createDeck: builder.mutation<Deck, FormData>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
      deleteCard: builder.mutation<any, string>({
        invalidatesTags: ['CardsDeck'],
        query: id => ({
          method: 'DELETE',
          url: `v1/cards/${id}`,
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
        providesTags: ['CardsDeck'],
        query: body => ({
          params: body.args ? body.args : undefined,
          url: `v1/decks/${body.id}/cards`,
        }),
      }),
      getDeck: builder.query<Deck, string>({
        providesTags: ['Deck', 'CardsDeck', 'Decks'],
        query: id => ({
          url: `v1/decks/${id}`,
        }),
      }),

      getDecks: builder.query<Response, GetDecksRequestType>({
        providesTags: ['Decks'],
        query: args => ({
          params: args ? args : undefined,
          url: `v2/decks`,
        }),
      }),
      getLearnCard: builder.query<Card, { args: { previousCardId: string }; id: string }>({
        providesTags: ['saveGrade'],
        query: body => ({
          params: body.args ? body.args : undefined,
          url: `v1/decks/${body.id}/learn`,
        }),
      }),
      getMinMaxAmoundCards: builder.query<{ max: number; min: number }, void>({
        providesTags: ['Decks'],
        query: () => `v2/decks/min-max-cards`,
      }),
      saveGradeCard: builder.mutation<Card, { args: SaveGradeCard; id: string }>({
        invalidatesTags: ['saveGrade'],
        query: body => ({
          body: body.args,
          method: 'POST',
          url: `v1/decks/${body.id}/learn`,
        }),
      }),
      updateCard: builder.mutation<Omit<Card, 'grade'>, { args: FormData; id: string }>({
        invalidatesTags: ['CardsDeck'],
        query: body => ({
          body: body.args,
          method: 'PATCH',
          url: `v1/cards/${body.id}`,
        }),
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
})

export const {
  useCreateCardMutation,
  useCreateDeckMutation,
  useDeleteCardMutation,
  useDeleteDeckMutation,
  useGetCardsDeckQuery,
  useGetDeckQuery,
  useGetDecksQuery,
  useGetLearnCardQuery,
  useGetMinMaxAmoundCardsQuery,
  useSaveGradeCardMutation,
  useUpdateCardMutation,
  useUpdateDeckMutation,
} = DeckService
