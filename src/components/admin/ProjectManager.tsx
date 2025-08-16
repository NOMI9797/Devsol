'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, X, Save, Loader2, Upload, Image as ImageIcon } from 'lucide-react'
import { createProject, getProjects, updateDocument, deleteDocument, uploadProjectImage, getFileView } from '@/lib/appwrite'

interface Project {
  $id: string
  title: string
  longDescription: string
  category: string
  technologies: string[]
  features: string[]
  mainPicture: string
  liveUrl?: string
  createdAt: string
  updatedAt: string
}

interface ProjectFormData {
  title: string
  longDescription: string
  category: string
  technologies: string
  features: string
  mainPicture: File | null
  liveUrl: string
}

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    longDescription: '',
    category: '',
    technologies: '',
    features: '',
    mainPicture: null,
    liveUrl: ''
  })
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const data = await getProjects()
      console.log('Fetched projects data:', data) // Debug log
      setProjects(data as unknown as Project[])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, mainPicture: file })
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    try {
      const fileId = await uploadProjectImage(file)
      // For now, return the file ID - we'll construct the URL when displaying
      return fileId
    } catch (error) {
      console.error('Error uploading image:', error)
      throw new Error('Failed to upload image')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.mainPicture && !editingProject) {
      alert('Please select a main image for the project')
      return
    }

    try {
      setUploading(true)
      
      let imageUrl = ''
      if (formData.mainPicture) {
        imageUrl = await uploadImage(formData.mainPicture)
      } else if (editingProject) {
        imageUrl = editingProject.mainPicture
      }

      const projectData = {
        title: formData.title,
        longDescription: formData.longDescription,
        category: formData.category,
        technologies: formData.technologies.split(',').map(tech => tech.trim()),
        features: formData.features.split(',').map(feature => feature.trim()),
        mainPicture: imageUrl,
        liveUrl: formData.liveUrl || undefined
      }

      if (editingProject) {
        // Update existing project
        await updateDocument('projects', editingProject.$id, projectData)
      } else {
        // Create new project
        await createProject(projectData)
      }

      // Reset form and refresh data
      resetForm()
      await fetchProjects()
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Error saving project. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      longDescription: project.longDescription,
      category: project.category,
      technologies: project.technologies.join(', '),
      features: project.features.join(', '),
      mainPicture: null,
      liveUrl: project.liveUrl || ''
    })
    // For editing, imagePreview will contain the file ID, not the actual image
    setImagePreview(project.mainPicture)
    setShowForm(true)
  }

  const handleDelete = async (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDocument('projects', projectId)
        await fetchProjects()
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      longDescription: '',
      category: '',
      technologies: '',
      features: '',
      mainPicture: null,
      liveUrl: ''
    })
    setEditingProject(null)
    setImagePreview('')
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
        <h2 className="text-2xl font-bold text-white">Project Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-neon-blue hover:bg-neon-blue/80 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Project Form */}
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
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    placeholder="React, Node.js, MongoDB"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Features (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                    placeholder="User authentication, Real-time updates"
                    required
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Main Project Image
                </label>
                <div className="space-y-3">
                  {/* File Input */}
                  <div className="flex items-center space-x-3">
                    <label className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition-colors">
                      <Upload className="h-4 w-4" />
                      <span>Choose Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        required={!editingProject}
                      />
                    </label>
                    {formData.mainPicture && (
                      <span className="text-green-400 text-sm">
                        ✓ {formData.mainPicture.name}
                      </span>
                    )}
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="relative">
                      <img
                        src={editingProject && !formData.mainPicture ? getFileView(imagePreview) : imagePreview}
                        alt="Project preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, mainPicture: null })
                          setImagePreview('')
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 rounded-full text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Live URL (optional)
                </label>
                <input
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                  placeholder="https://project-demo.com"
                />
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
                  disabled={uploading}
                  className="flex items-center space-x-2 px-4 py-2 bg-neon-blue hover:bg-neon-blue/80 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>
                    {uploading ? 'Saving...' : `${editingProject ? 'Update' : 'Create'} Project`}
                  </span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects List */}
      <div className="glass p-6 rounded-xl border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">All Projects</h3>
        
        {projects.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>No projects found. Create your first project!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <motion.div
                key={project.$id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden"
              >
                {/* Project Image */}
                <div className="h-48 bg-gray-700 relative">
                  {project.mainPicture ? (
                    <img
                      src={getFileView(project.mainPicture)}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Image failed to load for project:', project.title)
                        console.error('mainPicture value:', project.mainPicture)
                        console.error('Constructed URL:', getFileView(project.mainPicture))
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-gray-500" />
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-4">
                  <h4 className="text-white font-medium text-lg mb-2">{project.title}</h4>
                  <p className="text-neon-blue text-sm mb-2">{project.category}</p>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {project.longDescription}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>Created: {formatDate(project.createdAt)}</span>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neon-blue hover:underline"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700 text-gray-500 text-xs rounded">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-2 p-4 pt-0 border-t border-gray-700">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.$id)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectManager 