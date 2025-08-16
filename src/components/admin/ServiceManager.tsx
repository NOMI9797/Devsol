'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, X, Save, Loader2, Settings } from 'lucide-react'
import { createService, getServices, updateDocument, deleteDocument } from '@/lib/appwrite'

interface Service {
  $id: string
  name: string
  longDescription: string
  createdAt: string
  updatedAt: string
}

interface ServiceFormData {
  name: string
  longDescription: string
}

const ServiceManager = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    longDescription: ''
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const data = await getServices()
      setServices(data as unknown as Service[])
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const serviceData = {
        name: formData.name,
        longDescription: formData.longDescription
      }

      if (editingService) {
        // Update existing service
        await updateDocument('services', editingService.$id, serviceData)
      } else {
        // Create new service
        await createService(serviceData)
      }

      // Reset form and refresh data
      resetForm()
      await fetchServices()
    } catch (error) {
      console.error('Error saving service:', error)
      alert('Error saving service. Please try again.')
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      longDescription: service.longDescription
    })
    setShowForm(true)
  }

  const handleDelete = async (serviceId: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteDocument('services', serviceId)
        await fetchServices()
      } catch (error) {
        console.error('Error deleting service:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      longDescription: ''
    })
    setEditingService(null)
    setShowForm(false)
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
        <h2 className="text-2xl font-bold text-white">Service Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-neon-purple hover:bg-neon-purple/80 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Service Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass p-6 rounded-xl border border-gray-800"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Service Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-purple focus:outline-none"
                  placeholder="e.g., AI Development, Web Development, Consulting"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Service Description
                </label>
                <textarea
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  rows={6}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-purple focus:outline-none"
                  placeholder="Provide a detailed description of the service, including what it offers, benefits, and any key features..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 100 characters, maximum 2000 characters
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-neon-purple hover:bg-neon-purple/80 rounded-lg transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingService ? 'Update' : 'Create'} Service</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Services List */}
      <div className="glass p-6 rounded-xl border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">All Services</h3>
        
        {services.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <Settings className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>No services found. Add your first service!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <motion.div
                key={service.$id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 rounded-lg border border-gray-700 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-neon-purple/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Settings className="h-5 w-5 text-neon-purple" />
                      </div>
                      <h4 className="text-white font-semibold text-xl">{service.name}</h4>
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {service.longDescription}
                    </p>
                    
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <span>Created: {formatDate(service.createdAt)}</span>
                      <span>Updated: {formatDate(service.updatedAt)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                      title="Edit Service"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.$id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceManager 