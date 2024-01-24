import { authMeApi } from '@/features/Auth/api/authMe-api'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authMeApi.middleware),
  reducer: {
    [authMeApi.reducerPath]: authMeApi.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
