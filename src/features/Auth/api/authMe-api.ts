import { baseApi } from '@/app/api/base-api'

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
      logOut: builder.mutation<void, void>({
        invalidatesTags: ['Decks'],
        query: () => ({
          method: 'POST',
          url: `v1/auth/logout`,
        }),
      }),
    }
  },
})

export const { useAuthMeQuery, useLogOutMutation } = authMeApi
