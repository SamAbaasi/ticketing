/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Shield, Clock, AlertCircle } from 'lucide-react'
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Form validation schema
const verificationSchema = z.object({
  code: z.string().min(6, 'Code must be 6 digits').max(6, 'Code must be 6 digits'),
})

type VerificationFormData = z.infer<typeof verificationSchema>

// Mock interfaces - replace with your actual types
interface SessionInfo {
  session_id: string
  phone?: string
}

interface UserService {
  isLoggedIn: () => boolean
  getUserPhone: (masked?: boolean) => string
  verifyLogin: (formData: any, route?: string) => Promise<void>
  resendCode: (sessionInfo: SessionInfo) => Promise<void>
  resendCodeByEmail: (
    sessionInfo: SessionInfo,
    callback: (status: boolean) => void,
  ) => Promise<void>
  message?: string
}

// Mock implementations - replace with your actual service implementations
const useUserService = (): UserService => {
  const [message, setMessage] = useState<string>('')

  return {
    isLoggedIn: () => false,
    getUserPhone: (masked = false) => (masked ? '0935****574' : '09351234574'),
    verifyLogin: async (formData: any, route?: string) => {
      console.log('Verify login:', formData, route)
      setMessage('')
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
    },
    resendCode: async (sessionInfo: SessionInfo) => {
      console.log('Resend code:', sessionInfo)
      await new Promise(resolve => setTimeout(resolve, 500))
    },
    resendCodeByEmail: async (sessionInfo: SessionInfo, callback: (status: boolean) => void) => {
      console.log('Resend code by email:', sessionInfo)
      await new Promise(resolve => setTimeout(resolve, 500))
      callback(true)
    },
    message,
  }
}

// Generate fingerprint (mock implementation)
const generateFingerprint = (): number => {
  // Simple fingerprint generation - replace with actual implementation
  return Math.floor(Math.random() * 1000000)
}

export const VerificationPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string>('')
  const [emailSent, setEmailSent] = useState(false)
  const [disableResend, setDisableResend] = useState(true)
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes
  const [resendButtonText, setResendButtonText] = useState('Resend Code')

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const userService = useUserService()

  // Mock session info - replace with actual session management
  const sessionInfo: SessionInfo = {
    session_id: 'mock-session-123',
    phone: '09351234574',
  }

  // Form setup
  const form = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: '',
    },
  })

  // Timer functionality
  useEffect(() => {
    startTimer(120)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const startTimer = (duration: number) => {
    setTimeLeft(duration)
    setDisableResend(true)
    setResendButtonText('Resend Code')

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    const startTime = Date.now()

    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      const remaining = duration - elapsed

      if (remaining <= 0) {
        setTimeLeft(0)
        setDisableResend(false)
        setResendButtonText('Resend Code')
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      } else {
        setTimeLeft(remaining)
      }
    }, 1000)
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const onSubmit = async (values: VerificationFormData) => {
    try {
      setIsProcessing(true)
      setError('')

      const formData = {
        session_id: sessionInfo.session_id,
        code: values.code,
        fp: generateFingerprint(),
      }

      await userService.verifyLogin(formData)

      // Handle successful verification
      console.log('Verification successful')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCodeInput = (value: string) => {
    // Auto-submit when code is 6 digits
    if (value.length === 6) {
      form.handleSubmit(onSubmit)()
    }
  }

  const handleResendCode = async () => {
    try {
      await userService.resendCode(sessionInfo)
      startTimer(120)
      setEmailSent(false)
    } catch (err) {
      setError('Failed to resend code')
    }
  }

  const handleReturnToLogin = () => {
    // Navigate back to login - replace with your navigation logic
    console.log('Return to login')
  }

  if (userService.isLoggedIn()) {
    return null
  }

  function handleResendByEmail(): void {
    throw new Error('Function not implemented.')
  }

  return (
    <div className="w-full">
      {/* Return Link */}
      <button
        onClick={handleReturnToLogin}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span className="text-sm font-medium">Return To Login Page</span>
      </button>

      {/* Header */}
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">2-Factor Authentication</h3>
        <div className="text-gray-600">
          {!emailSent ? (
            <span>Code Sent to this {userService.getUserPhone(true)} Number</span>
          ) : (
            <div className="text-sm">
              <p>Email sent successfully. Please check your email.</p>
              <p>
                If you didn't receive the email{' '}
                <button
                  onClick={handleResendByEmail}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  try again
                </button>
                .
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <div className="space-y-6">
          {/* Error Alert */}
          {(error || userService.message) && (
            <Alert variant="destructive" appearance="light" close onClose={() => setError('')}>
              <AlertIcon>
                <AlertCircle />
              </AlertIcon>
              <AlertTitle>{error || userService.message}</AlertTitle>
            </Alert>
          )}

          {/* Code Input */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Enter the code"
                      className="pl-12 pr-24 text-center text-lg tracking-widest"
                      maxLength={6}
                      autoFocus
                      {...field}
                      onChange={e => {
                        field.onChange(e)
                        handleCodeInput(e.target.value)
                      }}
                    />
                  </FormControl>
                  {/* Timer */}
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm font-mono">{formatTime(timeLeft)}</span>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Option */}
          {!disableResend && !emailSent && (
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendByEmail}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                If you didn't receive the SMS, click here to have it sent to your Email
              </button>
            </div>
          )}

          {/* Resend Button */}
          <Button
            type="button"
            onClick={handleResendCode}
            disabled={disableResend}
            className="w-full"
            variant={disableResend ? 'secondary' : 'primary'}
            size="lg"
          >
            {resendButtonText}
          </Button>
        </div>
      </Form>
    </div>
  )
}
