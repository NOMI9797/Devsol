'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, isUserAdmin } from '@/lib/appwrite'
import AdminAuth from '@/components/AdminAuth'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser()
      const adminStatus = await isUserAdmin(currentUser)
      
      if (adminStatus) {
        setIsAuthenticated(true)
        setIsAdmin(true)
      } else {
        setIsAuthenticated(false)
        setIsAdmin(false)
      }
    } catch (error) {
      setIsAuthenticated(false)
      setIsAdmin(false)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-blue mx-auto mb-4"></div>
          <p className="text-white text-xl">Verifying Admin Access...</p>
        </div>
      </div>
    )
  }

  // Show login if not authenticated
  if (!isAuthenticated || !isAdmin) {
    return <AdminAuth />
  }

  // Show admin dashboard if authenticated and has admin role
  return <>{children}</>
} 