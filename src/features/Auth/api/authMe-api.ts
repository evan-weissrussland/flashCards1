import { baseApi } from '@/app/api/base-api'

export type Responce = {
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

type RecoverPass = {
  email: string
  html?: string
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
        invalidatesTags: ['authMe'],
        //onQueryStarted - это Optimistic Updates. Меняем стейт для эндпоинта authMe при вылогинивании.
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
      recoverPass: builder.mutation<void, RecoverPass>({
        query: arg => ({
          body: arg,
          method: 'POST',
          url: `/v1/auth/recover-password`,
        }),
      }),
      resetPass: builder.mutation<void, { args: { password: string }; token: string }>({
        query: body => ({
          body: body.args,
          method: 'POST',
          url: `/v1/auth/reset-password/${body.token}`,
        }),
      }),
      signUp: builder.mutation<Responce, SignUpBody>({
        query: arg => ({
          body: arg,
          method: 'POST',
          url: `v1/auth/sign-up`,
        }),
      }),
      updateUserData: builder.mutation<Responce, FormData>({
        invalidatesTags: ['authMe'],
        query: arg => ({
          body: arg,
          method: 'PATCH',
          url: `v1/auth/me`,
        }),
      }),
    }
  },
})

export const {
  useAuthMeQuery,
  useLogInMutation,
  useLogOutMutation,
  useRecoverPassMutation,
  useResetPassMutation,
  useSignUpMutation,
  useUpdateUserDataMutation,
} = authMeApi
