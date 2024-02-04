import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Responce = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

export const authMeApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: builder => {
    return {
      authMe: builder.query<Responce, void>({
        query: () => `/v1/auth/me`,
      }),
    }
  },
  reducerPath: 'authMeApi',
})

export const { useAuthMeQuery } = authMeApi
