import { Navigate, createBrowserRouter, useLocation } from 'react-router-dom'

import { App } from '@/app/ui/App'
import { Error404 } from '@/app/ui/Error404/Error404'
import { useAuthMeQuery } from '@/features/Auth/api/authMe-api'
import { CheckEmail } from '@/features/Auth/ui/CheckEmail/ui'
import { CreateNewPass } from '@/features/Auth/ui/CreateNewPass/ui'
import { EditProfileLogout } from '@/features/Auth/ui/EditProfileLogout/ui'
import { EditProfileSaveChange } from '@/features/Auth/ui/EditProfileSaveChange/ui'
import { ForgotPass } from '@/features/Auth/ui/ForgotPass/ui'
import { SignIn } from '@/features/Auth/ui/SignIn/ui'
import { SignUp } from '@/features/Auth/ui/SignUp/ui'
import { Deck } from '@/features/Decks/ui/Deck/Deck'
import { Decks } from '@/features/Decks/ui/Decks'

export const PrivateRouter = () => {
  const { pathname } = useLocation()
  const { data } = useAuthMeQuery()

  if (pathname.includes('recover-password')) {
    return null
  }

  return !data ? <Navigate to={'/signIn'} /> : <Navigate to={'/decks'} />
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
        path: 'recover-password/:token',
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
        element: <Deck />,
        path: 'decks/:id',
      },
      {
        element: <EditProfileLogout />,
        path: 'myProfile',
      },
      {
        element: <EditProfileSaveChange />,
        path: 'saveChangeMyProfile',
      },
    ],
    element: <App />,
    errorElement: <Error404 />,
    path: '/',
  },
])
