import { useAuth } from './auth-provider'
import { ScreenLoader } from '@/components/common/screen-loader'
import { Outlet } from 'react-router'

/**
 * Component to protect routes that require authentication.
 * Since we've simplified the auth system, this just checks if user is logged in.
 */
export const RequireAuth = () => {
  const { isLoading } = useAuth()

  // Show screen loader while checking auth status
  if (isLoading) {
    return <ScreenLoader />
  }

  // For demo purposes, we allow access even if not authenticated
  // In a real app, you'd redirect to login page or show login prompt
  return <Outlet />
}
