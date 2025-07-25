import React from 'react'
import { createBrowserRouter } from 'react-router'

import { SignInPage } from '@/screens/login'
import Main from '@/screens/main'

import ProtectedRoutes from '@/components/common/protectedRoutes'
// import NotFoundPage from "screens/notFound";

export const router = createBrowserRouter([
  {
    path: 'login',
    element: <SignInPage />,
  },
  //   {
  //     path: "*",
  //     element: <NotFoundPage />,
  //   },
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
