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

type SignUpBody = {
  email: string
  html?: string
  name?: string
  password: string
  sendConfirmationEmail?: boolean
  subject?: string
}
export const authMeApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      authMe: builder.query<Responce, void>({
        providesTags: ['login'],
        query: () => `v1/auth/me`,
      }),
      logIn: builder.mutation<Token, LoginBody>({
        invalidatesTags: ['login'],
        query: arg => ({
          body: arg,
          method: 'POST',
          url: `v1/auth/login`,
        }),
      }),
      logOut: builder.mutation<void, void>({
        query: () => ({
          method: 'POST',
          url: `v1/auth/logout`,
        }),
      }),
      refreshToken: builder.mutation<void, void>({
        query: () => ({
          method: 'POST',
          url: `v1/auth/refresh-token`,
        }),
      }),
      signUp: builder.mutation<Responce, SignUpBody>({
        query: arg => ({
          body: arg,
          method: 'POST',
          url: `v1/auth/sign-up`,
        }),
      }),
    }
  },
})

export const { useAuthMeQuery, useLogInMutation, useLogOutMutation, useSignUpMutation } = authMeApi
