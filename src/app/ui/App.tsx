import { createContext } from 'react'
import { Outlet } from 'react-router-dom'

import { PrivateRouter } from '@/app/model/router'
import { Header } from '@/app/ui/Header/ui'
import { useAuthMeQuery } from '@/features/Auth/api/authMe-api'

export const Context = createContext('')

export function App() {
  const result = useAuthMeQuery()

  if (result.isLoading) {
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        ...Loading
      </div>
    )
  }

  return (
    <>
      <Context.Provider value={result.data?.id as string}>
        <Header email={result.data?.email as string} name={result.data?.name as string} />
        <Outlet />
        <PrivateRouter data={result.data?.name as string} />
      </Context.Provider>
    </>
  )
}
