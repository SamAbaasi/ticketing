import { authRoutes } from '@/auth/auth-routes'
import ProtectedRoutes from '@/components/common/protectedRoutes'
import Main from '@/screens/main'
import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
  {
    path: 'auth',
    children: authRoutes,
  },
  {
    path: '/',
    element: <ProtectedRoutes />,
    children: [
      {
        path: '',
        element: <Main />,
      },
    ],
  },
])