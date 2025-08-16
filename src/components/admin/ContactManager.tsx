'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Trash2, X, CheckCircle, Clock, MessageSquare, AlertCircle, Archive, Loader2, Mail, Building, User, FileText } from 'lucide-react'
import { getContactSubmissions, updateDocument, deleteDocument } from '@/lib/appwrite'

interface ContactSubmission {
  $id: string
  name: string
  email: string
  company?: string
  subject: string
  message: string
  timestamp: string
  status: 'new' | 'in-progress' | 'responded' | 'closed' | 'spam'
}

const ContactManager = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const data = await getContactSubmissions()
      setSubmissions(data as unknown as ContactSubmission[])
    } catch (error) {
      console.error('Error fetching contact submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (submissionId: string, newStatus: string) => {
    try {
      await updateDocument('contact-submissions', submissionId, { status: newStatus })
      await fetchSubmissions()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleDelete = async (submissionId: string) => {
    if (confirm('Are you sure you want to delete this contact submission?')) {
      try {
        await deleteDocument('contact-submissions', submissionId)
        await fetchSubmissions()
      } catch (error) {
        console.error('Error deleting submission:', error)
      }
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return { icon: AlertCircle, color: 'text-red-400', bgColor: 'bg-red-400/10' }
      case 'in-progress':
        return { icon: Clock, color: 'text-yellow-400', bgColor: 'bg-yellow-400/10' }
      case 'responded':
        return { icon: CheckCircle, color: 'text-green-400', bgColor: 'bg-green-400/10' }
      case 'closed':
        return { icon: Archive, color: 'text-gray-400', bgColor: 'bg-gray-400/10' }
      case 'spam':
        return { icon: AlertCircle, color: 'text-orange-400', bgColor: 'bg-orange-400/10' }
      default:
        return { icon: MessageSquare, color: 'text-blue-400', bgColor: 'bg-blue-400/10' }
    }
  }

  const getStatusBadge = (status: string) => {
    const { icon: Icon, color, bgColor } = getStatusIcon(status)
    return (
      <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${color}`}>
        <Icon className="h-3 w-3" />
        <span className="capitalize">{status.replace('-', ' ')}</span>
      </span>
    )
  }

  const formatDate = (dateString: string) => {
    try {
      // Handle the new short format: "YYYY-MM-DD HH:MM"
      if (dateString.includes(' ')) {
        const [date, time] = dateString.split(' ')
        return `${date} at ${time}`
      }
      // Fallback for other formats
      return new Date(dateString).toLocaleDateString()
    } catch (error) {
      return dateString // Return as-is if parsing fails
    }
  }

  const filteredSubmissions = filterStatus === 'all' 
    ? submissions 
    : submissions.filter(sub => sub.status === filterStatus)

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-neon-blue" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Contact Submissions</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400 text-sm">
            Total: {submissions.length} | New: {submissions.filter(s => s.status === 'new').length}
          </span>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex space-x-2">
        {['all', 'new', 'in-progress', 'responded', 'closed', 'spam'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === status
                ? 'bg-neon-blue text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {status === 'all' ? 'All' : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Submissions List */}
      <div className="glass p-6 rounded-xl border border-gray-800">
        {filteredSubmissions.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>No contact submissions found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <motion.div
                key={submission.$id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 rounded-lg border border-gray-700 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-neon-blue/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-neon-blue" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">{submission.name}</h4>
                        <p className="text-neon-blue text-sm">{submission.email}</p>
                      </div>
                      {getStatusBadge(submission.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">
                          {submission.company || 'No company specified'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">{submission.subject}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-2">
                      {submission.message}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Submitted: {formatDate(submission.timestamp)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => {
                        setSelectedSubmission(submission)
                        setShowDetails(true)
                      }}
                      className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(submission.$id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Quick Status Update */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
                  <span className="text-xs text-gray-500">Quick Status Update:</span>
                  <div className="flex space-x-2">
                    {['new', 'in-progress', 'responded', 'closed', 'spam'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(submission.$id, status)}
                        className={`px-2 py-1 text-xs rounded transition-colors ${
                          submission.status === status
                            ? 'bg-neon-blue text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {status.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Submission Details Modal */}
      <AnimatePresence>
        {showDetails && selectedSubmission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass p-6 rounded-xl border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Contact Submission Details</h3>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <p className="text-white">{selectedSubmission.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <p className="text-white">{selectedSubmission.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                    <p className="text-white">{selectedSubmission.company || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                    <p className="text-white">{selectedSubmission.subject}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <p className="text-white leading-relaxed">{selectedSubmission.message}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Submitted</label>
                    <p className="text-white">{formatDate(selectedSubmission.timestamp)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                    <div className="mt-1">{getStatusBadge(selectedSubmission.status)}</div>
                  </div>
                </div>

                {/* Status Update */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Update Status</label>
                  <div className="flex flex-wrap gap-2">
                    {['new', 'in-progress', 'responded', 'closed', 'spam'].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          handleStatusUpdate(selectedSubmission.$id, status)
                          setShowDetails(false)
                        }}
                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                          selectedSubmission.status === status
                            ? 'bg-neon-blue text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {status.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ContactManager 