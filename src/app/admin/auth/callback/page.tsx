'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Shield, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { handleOAuthCallback, isUserAdmin, deleteCurrentSession } from '@/lib/appwrite'

const OAuthCallback = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const processCallback = async () => {
      try {
        setStatus('loading')
        setMessage('Processing authentication...')

        // Get OAuth parameters from URL
        const errorParam = searchParams.get('error')
        const userId = searchParams.get('userId')
        const sessionId = searchParams.get('sessionId')

        if (errorParam) {
          throw new Error('Authentication failed')
        }

        if (!userId || !sessionId) {
          throw new Error('Invalid OAuth response')
        }

        // Handle the OAuth callback
        const result = await handleOAuthCallback(window.location.href)
        
        if (result.success) {
          // Check if user has admin privileges
          const isAdmin = await isUserAdmin(result.user)
          
          if (isAdmin) {
            setStatus('success')
            setMessage('Authentication successful! Redirecting to admin dashboard...')
            
            // Redirect to admin dashboard after 2 seconds
            setTimeout(() => {
              router.push('/admin')
            }, 2000)
          } else {
            // User doesn't have admin privileges
            await deleteCurrentSession()
            setStatus('error')
            setMessage('Access denied. Admin privileges required.')
            
            // Redirect back to login after 3 seconds
            setTimeout(() => {
              router.push('/admin')
            }, 3000)
          }
        } else {
          throw new Error('Authentication failed')
        }
      } catch (error) {
        console.error('OAuth callback error:', error)
        setStatus('error')
        setMessage('Authentication failed. Please try again.')
        
        // Redirect back to login after 3 seconds
        setTimeout(() => {
          router.push('/admin')
        }, 3000)
      }
    }

    processCallback()
  }, [searchParams, router])

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-16 w-16 text-neon-blue animate-spin" />
      case 'success':
        return <CheckCircle className="h-16 w-16 text-green-500" />
      case 'error':
        return <AlertCircle className="h-16 w-16 text-red-500" />
      default:
        return <Shield className="h-16 w-16 text-gray-500" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'text-neon-blue'
      case 'success':
        return 'text-green-500'
      case 'error':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Status Icon */}
        <div className="mb-6">
          {getStatusIcon()}
        </div>

        {/* Status Message */}
        <h1 className={`text-2xl font-bold mb-4 ${getStatusColor()}`}>
          {status === 'loading' && 'Processing...'}
          {status === 'success' && 'Success!'}
          {status === 'error' && 'Error'}
        </h1>

        <p className="text-gray-300 text-lg mb-6">
          {message}
        </p>

        {/* Progress Bar for Loading */}
        {status === 'loading' && (
          <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
            <motion.div
              className="bg-neon-blue h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>
        )}

        {/* Manual Redirect Button */}
        {status === 'error' && (
          <button
            onClick={() => router.push('/admin')}
            className="px-6 py-3 bg-neon-blue hover:bg-neon-blue/80 text-white rounded-lg transition-colors duration-200"
          >
            Back to Login
          </button>
        )}

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs">
            <Shield className="inline h-3 w-3 mr-1" />
            Secure OAuth2 authentication in progress
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default OAuthCallback 