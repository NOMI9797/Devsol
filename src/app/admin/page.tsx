'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Users, 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  Plus, 
  LogOut,
  Shield,
  Database,
  BarChart3
} from 'lucide-react'
import { 
  getCurrentUser, 
  isUserAdmin, 
  deleteCurrentSession,
  checkAdminAccess,
  refreshUserAndCheckAdmin
} from '@/lib/appwrite'

interface User {
  $id: string
  email: string
  name?: string
  [key: string]: unknown
}

const AdminDashboard = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    projects: 0,
    team: 0,
    blogs: 0,
    contacts: 0,
    services: 0
  })

  // Check authentication and admin role
  useEffect(() => {
    checkAuth()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const checkAuth = async () => {
    try {
      const { user: currentUser, isAdmin: adminStatus } = await checkAdminAccess()
      setUser(currentUser)
      
      if (adminStatus) {
        setIsAdmin(true)
        // For now, set mock stats since we don't have database access here
        setStats({
          projects: 12,
          team: 8,
          blogs: 15,
          contacts: 25,
          services: 6
        })
      } else {
        // Redirect non-admin users
        router.push('/')
      }
    } catch {
      console.error('Not authenticated')
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const handleRefreshAdminStatus = async () => {
    setLoading(true)
    try {
      const { user: currentUser, isAdmin: adminStatus } = await refreshUserAndCheckAdmin()
      setUser(currentUser)
      
      if (adminStatus) {
        setIsAdmin(true)
        setStats({
          projects: 12,
          team: 8,
          blogs: 15,
          contacts: 25,
          services: 6
        })
      } else {
        setIsAdmin(false)
        router.push('/')
      }
    } catch (error) {
      console.error('Failed to refresh admin status:', error)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await deleteCurrentSession()
      router.push('/')
    } catch {
      console.error('Logout failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-blue mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl">Access Denied</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-neon-blue" />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, {user?.email}</span>
            <button
              onClick={handleRefreshAdminStatus}
              className="flex items-center space-x-2 px-3 py-2 bg-neon-blue hover:bg-neon-blue/80 rounded-lg transition-colors text-sm"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-6 rounded-xl border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Projects</p>
                <p className="text-3xl font-bold">{stats.projects}</p>
              </div>
              <Briefcase className="h-8 w-8 text-neon-blue" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-6 rounded-xl border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Team Members</p>
                <p className="text-3xl font-bold">{stats.team}</p>
              </div>
              <Users className="h-8 w-8 text-neon-green" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-6 rounded-xl border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Blog Posts</p>
                <p className="text-3xl font-bold">{stats.blogs}</p>
              </div>
              <FileText className="h-8 w-8 text-neon-purple" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-6 rounded-xl border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Contacts</p>
                <p className="text-3xl font-bold">{stats.contacts}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-neon-orange" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass p-6 rounded-xl border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Services</p>
                <p className="text-3xl font-bold">{stats.services}</p>
              </div>
              <Settings className="h-8 w-8 text-neon-pink" />
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass p-6 rounded-xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-300 hover:scale-105 text-left"
          >
            <Plus className="h-8 w-8 text-neon-blue mb-4" />
            <h3 className="text-lg font-semibold mb-2">Add New Project</h3>
            <p className="text-gray-400 text-sm">Create a new project entry</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="glass p-6 rounded-xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-300 hover:scale-105 text-left"
          >
            <Users className="h-8 w-8 text-neon-green mb-4" />
            <h3 className="text-lg font-semibold mb-2">Manage Team</h3>
            <p className="text-gray-400 text-sm">Add or edit team members</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="glass p-6 rounded-xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-300 hover:scale-105 text-left"
          >
            <Database className="h-8 w-8 text-neon-purple mb-4" />
            <h3 className="text-lg font-semibold mb-2">Database</h3>
            <p className="text-gray-400 text-sm">View all data collections</p>
          </motion.button>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="glass p-6 rounded-xl border border-gray-800"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart3 className="h-6 w-6 text-neon-blue mr-2" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-300">New project "AI Chatbot" added</span>
              <span className="text-gray-500 text-sm">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-300">Team member "John Doe" updated</span>
              <span className="text-gray-500 text-sm">1 day ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-300">Blog post "Future of AI" published</span>
              <span className="text-gray-500 text-sm">3 days ago</span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default AdminDashboard 