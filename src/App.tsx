import './App.css'
import { AuthProvider } from './auth/auth-provider'
import { RouterProvider } from 'react-router'
import { router } from '@/routes'

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
