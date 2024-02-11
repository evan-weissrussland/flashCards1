import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.flashcards.andrii.es',
  credentials: 'include',
  prepareHeaders: headers => {
    headers.append('x-auth-skip', 'false')
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      // try to get a new token
      const refreshResult = await baseQuery(
        {
          method: 'POST',
          url: 'v1/auth/refresh-token',
        },
        api,
        extraOptions
      )

      if (refreshResult.meta?.response?.status === 204) {
        result = await baseQuery(args, api, extraOptions)
      }
      release()
    }
  }

  return result
}
