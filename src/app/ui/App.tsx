import { createContext } from 'react'
import { Outlet } from 'react-router-dom'

import { PrivateRouter } from '@/app/model/router'
import { Header } from '@/app/ui/Header/ui'
import { useAuthMeQuery } from '@/features/Auth/api/authMe-api'

export const UserIdContext = createContext('')
//TODO: я хотел сделать переход на страницу колод по проверке верификации эмейла, если он true, то мы залогинены. Для этого передаю контекст в HEader. (запрос auth/me возвращает свойство isEmailVerified. Но оно всегда false. Это связано с тем, что нужно верифицирвоать емэйл? Но как сделать этот flow я не знаю). Поэтому заогиненность проверяю по id (смотри контекст UserIdContext)
export const UserEmailContext = createContext(false)

export function App() {
  const { data, isLoading } = useAuthMeQuery()

  if (isLoading) {
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
      <UserIdContext.Provider value={data?.id as string}>
        <UserEmailContext.Provider value={data?.isEmailVerified as boolean}>
          <Header email={data?.email as string} name={data?.name as string} />
          <Outlet />
          <PrivateRouter data={data?.id as string} />
        </UserEmailContext.Provider>
      </UserIdContext.Provider>
    </>
  )
}
