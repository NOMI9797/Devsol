'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, X, Save, Loader2, FileText, Image, Tag, Calendar, User, Eye } from 'lucide-react'
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost, uploadBlogImage, getFileView } from '@/lib/appwrite'

interface BlogPost {
  $id: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  imageUrl: string
  createdAt: string
  updatedAt: string
}

interface BlogPostFormData {
  title: string
  excerpt: string
  content: string
  category: string
  tags: string
  imageUrl: string
}

const BlogManager = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    imageUrl: ''
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const categories = [
    'Technology Trends',
    'AI & Machine Learning',
    'Web Development',
    'Cloud Computing',
    'Cybersecurity',
    'Data Science',
    'Business Insights',
    'Industry News',
    'Tutorials',
    'Case Studies'
  ]

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      setLoading(true)
      const data = await getBlogPosts()
      setBlogPosts(data as unknown as BlogPost[])
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic form validation
    if (!formData.title.trim()) {
      alert('Please enter a title')
      return
    }
    if (!formData.excerpt.trim()) {
      alert('Please enter an excerpt')
      return
    }
    if (!formData.content.trim()) {
      alert('Please enter content')
      return
    }
    if (!formData.category.trim()) {
      alert('Please select a category')
      return
    }
    if (!formData.tags.trim()) {
      alert('Please enter tags')
      return
    }
    if (!imageFile && !formData.imageUrl) {
      alert('Please select a featured image')
      return
    }
    
    try {
      console.log('Starting blog post submission...')
      console.log('Form data:', formData)
      console.log('Image file:', imageFile)
      
      setIsSubmitting(true)
      
      let imageUrl = formData.imageUrl
      
      // Upload image if a new file was selected
      if (imageFile) {
        console.log('Uploading image...')
        imageUrl = await uploadImage(imageFile)
        console.log('Image uploaded successfully:', imageUrl)
      }
      
      const postData = {
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        imageUrl: imageUrl
      }
      
      console.log('Blog post data to save:', postData)
      console.log('Collection name: blog-posts')
      
      if (editingPost) {
        console.log('Updating existing blog post...')
        await updateBlogPost(editingPost.$id, postData)
        console.log('Blog post updated successfully!')
        setSuccessMessage('Blog post updated successfully!')
      } else {
        console.log('Creating new blog post...')
        await createBlogPost(postData)
        console.log('Blog post added successfully!')
        setSuccessMessage('Blog post added successfully!')
      }
      
      console.log('Form submission completed, resetting form...')
      resetForm()
      await fetchBlogPosts()
      console.log('Blog posts refreshed')
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error saving blog post:', error)
      alert(`Error saving blog post: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
      console.log('Form submission finished')
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags.join(', '),
      imageUrl: post.imageUrl
    })
    setImageFile(null)
    setImagePreview('')
    setShowForm(true)
  }

  const handleDelete = async (postId: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlogPost(postId)
        await fetchBlogPosts()
      } catch (error) {
        console.error('Error deleting blog post:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      imageUrl: ''
    })
    setImageFile(null)
    setImagePreview('')
    setEditingPost(null)
    setShowForm(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const uploadImage = async (file: File): Promise<string> => {
    try {
      console.log('Starting image upload for blog post...')
      console.log('File details:', { name: file.name, size: file.size, type: file.type })
      
      const imageUrl = await uploadBlogImage(file)
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
        <h2 className="text-2xl font-bold text-white">Blog Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-neon-green hover:bg-neon-green/80 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Blog Post</span>
        </button>
      </div>

      {/* Blog Post Form */}
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
                {editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
              </h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-green focus:outline-none"
                    placeholder="Enter blog post title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-green focus:outline-none"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-green focus:outline-none"
                  placeholder="Brief summary of the blog post"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-green focus:outline-none"
                  placeholder="Full blog post content"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-green focus:outline-none"
                  placeholder="AI, Technology, Innovation, Web Development"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate multiple tags with commas
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Featured Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setImageFile(file)
                      setImagePreview(URL.createObjectURL(file))
                      setFormData({ ...formData, imageUrl: '' }) // Clear URL input
                    }
                  }}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-700 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neon-green file:text-white hover:file:bg-neon-green/80"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Image Preview" className="mt-2 max-w-xs h-auto rounded-md" />
                )}
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
                      <span>{editingPost ? 'Update' : 'Create'} Blog Post</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog Posts List */}
      <div className="glass p-6 rounded-xl border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">All Blog Posts</h3>
        
        {blogPosts.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>No blog posts found. Add your first blog post!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogPosts.map((post) => (
              <motion.div
                key={post.$id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 rounded-lg border border-gray-700 p-4"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-neon-green" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{post.title}</h4>
                    <p className="text-neon-green text-sm">{post.category}</p>
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Calendar className="h-3 w-3 text-gray-500" />
                      <span className="text-gray-500 text-xs">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-2 mt-3 pt-3 border-t border-gray-700">
                  <a
                    href={`/blog/${post.$id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-green-400 hover:text-green-300 transition-colors"
                    title="View Post"
                  >
                    <Eye className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.$id)}
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

export default BlogManager 