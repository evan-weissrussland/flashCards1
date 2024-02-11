import { baseApi } from '@/app/api/base-api'
import { Deck } from '@/features/Decks/api/getDecks'

type Responce = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

export const authMeApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      authMe: builder.query<Responce, void>({
        query: () => `/v1/auth/me`,
      }),
      logOut: builder.mutation<Deck, FormData>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
    }
  },
})

export const { useAuthMeQuery } = authMeApi
