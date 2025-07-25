import { RouteObject } from 'react-router'
import { BrandedLayout } from './layouts/branded'
import { ClassicLayout } from './layouts/classic'
import { CallbackPage } from './pages/callback-page'
import { CheckEmail } from './pages/extended/check-email'
import { ResetPasswordChanged } from './pages/extended/reset-password-changed'
import { ResetPasswordCheckEmail } from './pages/extended/reset-password-check-email'
import { TwoFactorAuth } from './pages/extended/tfa'
import { SignInPage } from './pages/signin-page'

// Define the auth routes
export const authRoutes: RouteObject[] = [
  {
    path: '',
    element: <BrandedLayout />,
    children: [
      {
        path: 'signin',
        element: <SignInPage />,
      },
      /* Extended examples */
      {
        path: '2fa',
        element: <TwoFactorAuth />,
      },
      {
        path: 'check-email',
        element: <CheckEmail />,
      },
      {
        path: 'reset-password/check-email',
        element: <ResetPasswordCheckEmail />,
      },
      {
        path: 'reset-password/changed',
        element: <ResetPasswordChanged />,
      },
    ],
  },
  {
    path: '',
    element: <ClassicLayout />,
    children: [
      {
        path: 'classic/signin',
        element: <SignInPage />,
      },
      /* Extended examples */
      {
        path: 'classic/2fa',
        element: <TwoFactorAuth />,
      },
      {
        path: 'classic/check-email',
        element: <CheckEmail />,
      },
      {
        path: 'classic/reset-password/check-email',
        element: <ResetPasswordCheckEmail />,
      },
      {
        path: 'classic/reset-password/changed',
        element: <ResetPasswordChanged />,
      },
    ],
  },
  {
    path: 'callback',
    element: <CallbackPage />,
  },
]
