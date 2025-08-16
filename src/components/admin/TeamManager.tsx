'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, X, Save, Loader2, User } from 'lucide-react'
import { getTeamMembers, createTeamMember, updateDocument, deleteDocument, uploadTeamPhoto, getFileView } from '@/lib/appwrite'

interface TeamMember {
  $id: string
  name: string
  role: string
  longBio: string
  expertise: string[]
  experience: string
  linkedin?: string
  github?: string
  email: string
  profilePic: string
  createdAt: string
  updatedAt: string
}

interface TeamMemberFormData {
  name: string
  role: string
  longBio: string
  expertise: string
  experience: string
  linkedin: string
  github: string
  email: string
  profilePic: string
}

const TeamManager = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [formData, setFormData] = useState<TeamMemberFormData>({
    name: '',
    role: '',
    longBio: '',
    expertise: '',
    experience: '',
    linkedin: '',
    github: '',
    email: '',
    profilePic: ''
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      const data = await getTeamMembers()
      setTeamMembers(data as unknown as TeamMember[])
    } catch (error) {
      console.error('Error fetching team members:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic form validation
    if (!formData.name.trim()) {
      alert('Please enter a name')
      return
    }
    if (!formData.role.trim()) {
      alert('Please enter a role')
      return
    }
    if (!formData.longBio.trim()) {
      alert('Please enter a bio')
      return
    }
    if (!formData.expertise.trim()) {
      alert('Please enter expertise')
      return
    }
    if (!formData.experience.trim()) {
      alert('Please enter experience')
      return
    }
    if (!formData.email.trim()) {
      alert('Please enter an email')
      return
    }
    if (!imageFile && !formData.profilePic) {
      alert('Please select a profile picture')
      return
    }
    
    try {
      console.log('Starting team member submission...')
      console.log('Form data:', formData)
      console.log('Image file:', imageFile)
      
      setIsSubmitting(true)
      
      let imageUrl = formData.profilePic
      
      // Upload image if a new file was selected
      if (imageFile) {
        console.log('Uploading image...')
        imageUrl = await uploadImage(imageFile)
        console.log('Image uploaded successfully:', imageUrl)
      }
      
      const memberData = {
        name: formData.name,
        role: formData.role,
        longBio: formData.longBio,
        expertise: formData.expertise.split(',').map(exp => exp.trim()),
        experience: formData.experience,
        linkedin: formData.linkedin.trim() || undefined,
        github: formData.github.trim() || undefined,
        email: formData.email,
        profilePic: imageUrl
      }
      
      console.log('Member data to save:', memberData)
      console.log('Collection name: team-members')
      
      if (editingMember) {
        console.log('Updating existing team member...')
        await updateDocument('team-members', editingMember.$id, memberData)
        console.log('Team member updated successfully!')
        setSuccessMessage('Team member updated successfully!')
      } else {
        console.log('Creating new team member...')
        await createTeamMember(memberData)
        console.log('Team member added successfully!')
        setSuccessMessage('Team member added successfully!')
      }
      
      console.log('Form submission completed, resetting form...')
      resetForm()
      await fetchTeamMembers()
      console.log('Team members refreshed')
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error saving team member:', error)
      alert(`Error saving team member: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
      console.log('Form submission finished')
    }
  }

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      role: member.role,
      longBio: member.longBio,
      expertise: member.expertise.join(', '),
      experience: member.experience,
      linkedin: member.linkedin || '',
      github: member.github || '',
      email: member.email,
      profilePic: member.profilePic
    })
    setImageFile(null)
    setImagePreview('')
    setShowForm(true)
  }

  const handleDelete = async (memberId: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      try {
        await deleteDocument('team-members', memberId)
        await fetchTeamMembers()
      } catch (error) {
        console.error('Error deleting team member:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      longBio: '',
      expertise: '',
      experience: '',
      linkedin: '',
      github: '',
      email: '',
      profilePic: ''
    })
    setImageFile(null)
    setImagePreview('')
    setEditingMember(null)
    setShowForm(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const uploadImage = async (file: File): Promise<string> => {
    try {
      console.log('Starting image upload for team member...')
      console.log('File details:', { name: file.name, size: file.size, type: file.type })
      
      const imageUrl = await uploadTeamPhoto(file)
      console.log('Image upload completed:', imageUrl)
      return imageUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
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
        <h2 className="text-2xl font-bold text-white">Team Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-neon-green hover:bg-neon-green/80 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Team Member Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass p-6 rounded-xl border border-gray-800"
          >
            {/* Success Message */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 p-3 bg-green-900/20 border border-green-500/20 rounded-lg text-green-400 mb-4"
              >
                <span className="text-sm">{successMessage}</span>
              </motion.div>
            )}
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
              </h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-green focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Role/Position
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-green focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.longBio}
                  onChange={(e) => setFormData({ ...formData, longBio: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-green focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Expertise (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.expertise}
                    onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-green focus:outline-none"
                    placeholder="React, Node.js, UI/UX Design"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-green focus:outline-none"
                    placeholder="5+ years"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-green focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setImageFile(file)
                        setImagePreview(URL.createObjectURL(file))
                        setFormData({ ...formData, profilePic: '' }) // Clear URL input
                      }
                    }}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-700 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neon-green file:text-white hover:file:bg-neon-green/80"
                  />
                  {imagePreview && (
                    <img src={imagePreview} alt="Profile Preview" className="mt-2 max-w-xs h-auto rounded-md" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    LinkedIn Username (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-green focus:outline-none"
                    placeholder="username (e.g., john-doe)"
                    maxLength={40}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum 40 characters. Use just the username (e.g., "john-doe" instead of full URL)
                  </p>
                  {formData.linkedin && (
                    <p className={`text-xs mt-1 ${formData.linkedin.length > 35 ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {formData.linkedin.length}/40 characters
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    GitHub Username (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-green focus:outline-none"
                    placeholder="username (e.g., johndoe)"
                    maxLength={40}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum 40 characters. Use just the username (e.g., "johndoe" instead of full URL)
                  </p>
                  {formData.github && (
                    <p className={`text-xs mt-1 ${formData.github.length > 35 ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {formData.github.length}/40 characters
                    </p>
                  )}
                </div>
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
                  className="flex items-center space-x-2 px-4 py-2 bg-neon-green hover:bg-neon-green/80 rounded-lg transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>{editingMember ? 'Update' : 'Create'} Team Member</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Team Members List */}
      <div className="glass p-6 rounded-xl border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">All Team Members</h3>
        
        {teamMembers.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <User className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>No team members found. Add your first team member!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <motion.div
                key={member.$id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 rounded-lg border border-gray-700 p-4"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-neon-green" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{member.name}</h4>
                    <p className="text-neon-green text-sm">{member.role}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {member.expertise.slice(0, 2).join(', ')}
                      {member.expertise.length > 2 && '...'}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Added: {formatDate(member.createdAt)}
                    </p>
                    {/* Social Links */}
                    {(member.linkedin || member.github) && (
                      <div className="flex space-x-2 mt-2">
                        {member.linkedin && (
                          <a
                            href={`https://linkedin.com/in/${member.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-xs"
                            title="LinkedIn Profile"
                          >
                            LinkedIn
                          </a>
                        )}
                        {member.github && (
                          <a
                            href={`https://github.com/${member.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-300 text-xs"
                            title="GitHub Profile"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-2 mt-3 pt-3 border-t border-gray-700">
                  <button
                    onClick={() => handleEdit(member)}
                    className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.$id)}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
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

export default TeamManager 