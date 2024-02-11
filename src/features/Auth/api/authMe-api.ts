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

type Token = {
  accessToken: string
}
type LoginBody = {
  email: string
  password: string
  rememberMe: boolean
}
export const authMeApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      authMe: builder.query<Responce, void>({
        query: () => `/v1/auth/me`,
      }),
      logIn: builder.mutation<Token, LoginBody>({
        invalidatesTags: ['Decks'],
        query: () => ({
          method: 'POST',
          url: `v1/auth/login`,
        }),
      }),
      logOut: builder.mutation<void, void>({
        invalidatesTags: ['Decks'],
        query: arg => ({
          body: arg,
          method: 'POST',
          url: `v1/auth/logout`,
        }),
      }),
      signUp: builder.mutation<Responce, void>({
        invalidatesTags: ['Decks'],
        query: arg => ({
          body: arg,
          method: 'POST',
          url: `v1/auth/sign-in`,
        }),
      }),
    }
  },
})

export const { useAuthMeQuery, useLogInMutation, useLogOutMutation } = authMeApi
