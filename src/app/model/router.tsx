import { Navigate, createBrowserRouter } from 'react-router-dom'

import { App } from '@/app/ui/App'
import { Error404 } from '@/app/ui/Error404/Error404'
import { useAuthMeQuery } from '@/features/Auth/api/authMe-api'
import { CheckEmail } from '@/features/Auth/ui/CheckEmail/ui'
import { CreateNewPass } from '@/features/Auth/ui/CreateNewPass/ui'
import { ForgotPass } from '@/features/Auth/ui/ForgotPass/ui'
import { SignIn } from '@/features/Auth/ui/SignIn/ui'
import { SignUp } from '@/features/Auth/ui/SignUp/ui'
import { Decks } from '@/features/Decks/Decks'

const PrivateRouter = () => {
  //вытягивам из Redux'а состояние: залогинен или нет
  const isLogged = false
  const result = useAuthMeQuery()

  console.log(result)

  return !isLogged ? <Navigate to={'/signIn'} /> : <Navigate to={'/decks'} />
}

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <SignIn />,
        path: 'signIn',
      },
      {
        element: <SignUp />,
        path: 'signUp',
      },
      {
        element: <CheckEmail />,
        path: 'checkEmail',
      },
      {
        element: <CreateNewPass />,
        path: 'createNewPass',
      },
      {
        element: <ForgotPass />,
        path: 'forgotPass',
      },
      {
        element: <Decks />,
        path: 'decks',
      },
      {
        element: <PrivateRouter />,
        path: '/',
      },
      {
        element: <Error404 />,
        path: '*',
      },
    ],
    element: <App />,
  },
])
//т.к. для <App/> нет path, то он будет отображаться всегда.
