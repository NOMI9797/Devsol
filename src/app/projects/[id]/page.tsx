'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { ArrowLeft, Eye, ExternalLink, Calendar, Code, Globe, Brain, Shield, Cloud, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getDocument, getFileView } from '@/lib/appwrite'

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

const ProjectDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchProject(params.id as string)
    }
  }, [params.id])

  const fetchProject = async (projectId: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await getDocument('projects', projectId)
      setProject(data as unknown as Project)
    } catch (err) {
      console.error('Error fetching project:', err)
      setError('Failed to load project')
    } finally {
      setLoading(false)
    }
  }

  // Get icon and color based on category
  const getProjectStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ai development':
        return { icon: Brain, color: 'from-neon-blue to-cyan-500' }
      case 'cloud infrastructure':
        return { icon: Cloud, color: 'from-neon-purple to-pink-500' }
      case 'cybersecurity':
        return { icon: Shield, color: 'from-green-500 to-emerald-500' }
      case 'data analytics':
        return { icon: Globe, color: 'from-orange-500 to-red-500' }
      case 'web development':
        return { icon: Globe, color: 'from-yellow-500 to-orange-500' }
      case 'consulting':
        return { icon: Brain, color: 'from-indigo-500 to-purple-500' }
      default:
        return { icon: Code, color: 'from-neon-blue to-neon-purple' }
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <Loader2 className="h-16 w-16 text-neon-blue animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading project...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-black">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <div className="glass p-12 rounded-3xl border border-gray-800 max-w-2xl mx-auto">
            <Code className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Project Not Found</h2>
            <p className="text-gray-300 mb-6">
              {error || 'The project you are looking for could not be found.'}
            </p>
            <Link
              href="/projects"
              className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full font-medium hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300"
            >
              Back to Projects
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const { icon: Icon, color } = getProjectStyle(project.category)

  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 animated-bg"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/projects"
              className="inline-flex items-center space-x-2 text-neon-blue hover:text-neon-blue/80 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Projects</span>
            </Link>
          </motion.div>

          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white text-sm font-medium rounded-full mb-6">
              {project.category}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              {project.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {project.longDescription}
            </p>
          </motion.div>

          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="relative">
              {project.mainPicture ? (
                <img
                  src={getFileView(project.mainPicture)}
                  alt={project.title}
                  className="w-full h-96 object-cover rounded-2xl mb-8"
                  onError={(e) => {
                    console.error('Image failed to load for project:', project.title)
                    console.error('mainPicture value:', project.mainPicture)
                    console.error('Constructed URL:', getFileView(project.mainPicture))
                  }}
                />
              ) : null}
              {/* Fallback */}
              <div className={`w-full max-w-4xl mx-auto h-96 bg-gradient-to-br ${color} opacity-20 rounded-3xl border border-gray-800 flex items-center justify-center ${project.mainPicture ? 'hidden' : ''}`}>
                <Icon className="h-24 w-24 text-neon-blue" />
              </div>
            </div>
          </motion.div>

          {/* Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Technologies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass p-8 rounded-3xl border border-gray-800"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                  <Code className="h-6 w-6 text-neon-blue" />
                  <span>Technologies Used</span>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass p-8 rounded-3xl border border-gray-800"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                  <Globe className="h-6 w-6 text-neon-blue" />
                  <span>Key Features</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glass p-6 rounded-2xl border border-gray-800"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Project Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Calendar className="h-4 w-4 text-neon-blue" />
                    <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Calendar className="h-4 w-4 text-neon-blue" />
                    <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-3"
              >
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl font-medium hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Live Demo</span>
                  </a>
                )}
                <Link
                  href="/contact"
                  className="w-full px-6 py-3 glass border border-neon-blue/20 text-neon-blue rounded-xl font-medium hover:bg-neon-blue hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  Start Similar Project
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default ProjectDetailPage 