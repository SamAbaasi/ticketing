/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from 'react'
import { User, Lock, AlertCircle } from 'lucide-react'
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router'

// Form validation schema
const loginSchema = z.object({
  username: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

// Mock API - replace with your actual API import
const api = {
  verifyUser: async (username: string, password: string) => {
    // Mock API call - replace with your actual API
    console.log('API call:', { username, password })
    // Simulate API response
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock response that triggers 2FA
    return {
      data: {
        requires_2fa: true,
        session_id: 'mock-session-123',
        phone: '09351234574',
      },
    }
  },
}

export const SignInPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  // Form setup with react-hook-form and zod
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const getToken = useCallback(
    (username: string, password: string) => {
      return new Promise((resolve, reject) => {
        api
          .verifyUser(username, password)
          .then((response: any) => {
            console.log('API Response:', response)

            // Check if 2FA is required
            if (response?.data?.requires_2fa) {
              // Store session info for verification page
              const sessionInfo = {
                session_id: response.data.session_id,
                phone: response.data.phone,
                username: username,
              }

              // Store in sessionStorage for verification page
              sessionStorage.setItem('verification_session', JSON.stringify(sessionInfo))

              // Navigate to verification page
              navigate('/auth/2fa')
              resolve(response)
            } else {
              // Handle direct login success (no 2FA required)
              console.log('Login successful, no 2FA required')
              resolve(response)
            }
          })
          .catch((err: any) => {
            console.error('Login error:', err)

            // Handle different error types
            if (err?.response?.data) {
              const errorData = err.response.data
              let errorMessage = 'Login failed'

              if (errorData.detail) {
                errorMessage = errorData.detail
              } else if (errorData.params?.message) {
                errorMessage = errorData.params.message
              } else if (errorData.data) {
                errorMessage = errorData.data
              }

              reject(new Error(errorMessage))
            } else {
              reject(new Error('An error occurred during login'))
            }
          })
      })
    },
    [navigate],
  )

  const onSubmit = async (values: LoginFormData) => {
    try {
      setIsProcessing(true)
      setError('')

      await getToken(values.username, values.password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">Login</h3>
        <span className="text-gray-600 text-lg">With MTNI Account</span>
      </div>

      {/* Form */}
      <Form {...form}>
        <div className="space-y-6">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" appearance="light" close onClose={() => setError('')}>
              <AlertIcon>
                <AlertCircle />
              </AlertIcon>
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}

          {/* Username/Email Input */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <FormControl>
                    <Input placeholder="Email" className="pl-12" autoFocus {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Input */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="pl-12"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Login Button */}
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="w-full"
            disabled={isProcessing}
            size="lg"
          >
            {isProcessing ? 'Loading...' : 'Login'}
          </Button>

          {/* Legacy Link */}
          <div className="text-center mt-4">
            <a
              href="https://legacy.ios.mtnirancell.ir/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline text-sm"
            >
              Click Here For IOS Legacy
            </a>
          </div>
        </div>
      </Form>
    </div>
  )
}
