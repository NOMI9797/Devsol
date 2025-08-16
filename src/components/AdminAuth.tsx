'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Shield, UserCheck, AlertCircle, CheckCircle } from 'lucide-react'
import { 
  createGoogleOAuthSession, 
  getCurrentUser, 
  deleteCurrentSession,
  isUserAdmin,
  handleOAuthCallback,
  checkAdminAccess,
  refreshUserAndCheckAdmin
} from '@/lib/appwrite'
import AdminStatusChecker from './AdminStatusChecker'

const AdminAuth = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  // Check if user is already authenticated
  useEffect(() => {
    checkExistingAuth()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle OAuth callback
  useEffect(() => {
    const handleCallback = async () => {
      const errorParam = searchParams.get('error')
      const userId = searchParams.get('userId')
      const sessionId = searchParams.get('sessionId')

      if (errorParam) {
        setError('Authentication failed. Please try again.')
        setIsCheckingAuth(false)
        return
      }

      if (userId && sessionId) {
        try {
          setLoading(true)
          const result = await handleOAuthCallback(window.location.href)
          if (result.success) {
            const isAdmin = await isUserAdmin(result.user)
            if (isAdmin) {
              setSuccess('Authentication successful! Redirecting...')
              setTimeout(() => router.push('/admin'), 2000)
            } else {
              setError('Access denied. Admin privileges required.')
              await deleteCurrentSession()
            }
          }
        } catch (err) {
          setError('Failed to complete authentication.')
          console.error('OAuth callback error:', err)
        } finally {
          setLoading(false)
          setIsCheckingAuth(false)
        }
      }
    }

    if (searchParams.has('userId') || searchParams.has('error')) {
      handleCallback()
    }
  }, [searchParams, router])

  const checkExistingAuth = async () => {
    try {
      const { user, isAdmin } = await checkAdminAccess()
      
      if (isAdmin) {
        router.push('/admin')
      } else {
        // Show more detailed information about the user's current status
        const userLabels = user?.labels || []
        setError(`Access denied. Admin privileges required. Current user labels: [${userLabels.join(', ')}]. Please add "admin" label in Appwrite Console.`)
        setIsCheckingAuth(false)
      }
    } catch {
      // User not authenticated, show login
      setIsCheckingAuth(false)
    }
  }

  const handleRefreshAdminStatus = async () => {
    setLoading(true)
    setError('')
    
    try {
      const { user, isAdmin } = await refreshUserAndCheckAdmin()
      
      if (isAdmin) {
        setSuccess('Admin access granted! Redirecting...')
        setTimeout(() => router.push('/admin'), 2000)
      } else {
        const userLabels = user?.labels || []
        setError(`Admin privileges still not available. Current user labels: [${userLabels.join(', ')}]. Please ensure the "admin" label is added in Appwrite Console.`)
      }
    } catch (error) {
      setError('Failed to refresh admin status. Please try again.')
      console.error('Refresh error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      console.log('Starting Google OAuth login...')
      
      // Create Google OAuth session
      const session = await createGoogleOAuthSession()
      console.log('OAuth session created successfully:', session)
      
      // The user should be redirected to Google OAuth
      // After successful OAuth, they'll return to the redirect URI
      setSuccess('Redirecting to Google... Please complete the authentication.')
      
      // Note: The redirect should happen automatically via Appwrite
      // If it doesn't, there might be an issue with the OAuth configuration
      
    } catch (error: unknown) {
      console.error('Google OAuth error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setError(`Google OAuth failed: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-blue mx-auto mb-4"></div>
          <p className="text-white text-xl">Checking Authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin Access
          </h1>
          <p className="text-gray-400">
            Sign in with your Google account to access the Admin Dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="glass p-8 rounded-2xl border border-gray-800">
          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 p-3 bg-green-900/20 border border-green-500/20 rounded-lg text-green-400 mb-4"
            >
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{success}</span>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 p-3 bg-red-900/20 border border-red-500/20 rounded-lg text-red-400 mb-4"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 py-4 px-6 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Sign in with Google</span>
              </>
            )}
          </button>

          {/* Instructions */}
          <div className="text-center text-gray-400 text-sm">
            <p className="mb-2">
              <UserCheck className="inline h-4 w-4 mr-1" />
              Only users with admin privileges can access this dashboard
            </p>
            <p className="mb-4">
              After signing in, please ensure your Google account has the &quot;admin&quot; label in Appwrite Console
            </p>
            
            {/* Refresh Admin Status Button */}
            <button
              onClick={handleRefreshAdminStatus}
              disabled={loading}
              className="w-full py-2 px-4 bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue/30 text-neon-blue rounded-lg text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Checking...' : 'Refresh Admin Status'}
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            <Shield className="inline h-3 w-3 mr-1" />
            Secure admin access with Google OAuth2 authentication
          </p>
        </div>

        {/* Admin Status Checker - Show when user is authenticated */}
        {!isCheckingAuth && !error.includes('Access denied') && (
          <div className="mt-6">
            <AdminStatusChecker />
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default AdminAuth 