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
        providesTags: ['authMe'],
        query: () => `v1/auth/me`,
      }),
      logIn: builder.mutation<Token, LoginBody>({
        invalidatesTags: ['authMe'],
        query: arg => ({
          body: arg,
          method: 'POST',
          url: `v1/auth/login`,
        }),
      }),
      logOut: builder.mutation<void, void>({
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            baseApi.util.updateQueryData('authMe' as never, undefined as never, () => {
              return null
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        query: () => ({
          method: 'POST',
          url: `v1/auth/logout`,
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
