import { authMeApi } from '@/features/Auth/api/authMe-api'
import { baseApi } from '@/features/Decks/api/getDecks'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authMeApi.middleware, baseApi.middleware),
  reducer: {
    [authMeApi.reducerPath]: authMeApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
