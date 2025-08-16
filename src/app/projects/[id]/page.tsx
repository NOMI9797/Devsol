'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { ArrowLeft, Eye, ExternalLink, Code, Globe, Brain, Shield, Cloud, Loader2, Code2 } from 'lucide-react'
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
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 animated-bg"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-8"
          >
            <Link
              href="/projects"
              className="inline-flex items-center space-x-2 text-neon-blue hover:text-neon-blue/80 transition-colors text-sm md:text-base"
            >
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
              <span>Back to Projects</span>
            </Link>
          </motion.div>

          

          {/* Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Left Side - Project Info */}
            <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
              {/* Project Name & Category */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h2>
                </div>
                </motion.div>

              {/* Project Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4"
              >
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {project.longDescription}
                </p>
                <div className="inline-block px-1 -py-1 bg-gradient-to-r from-neon-blue to-neon-purple text-white text-sm font-medium rounded-full">
                  {project.category}
                </div>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Code2 className="h-5 w-5 text-neon-blue" />
                  <span>Tech Stack</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 text-neon-blue rounded-full text-md font-medium hover:bg-gradient-to-r hover:from-neon-blue/30 hover:to-neon-purple/30 hover:border-neon-blue/50 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-2"
              >
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-3 py-1 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Eye className="h-3 w-3" />
                    <span>Live Demo</span>
                  </a>
                )}
                <Link
                  href="/contact"
                  className="flex-1 px-3 py-1 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 flex items-center justify-center"
                >
                  Start Similar Project
                </Link>
              </motion.div>
            </div>

            {/* Right Side - Project Image */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-8"
              >
                {project.mainPicture ? (
                  <div className="relative">
                    <img
                      src={getFileView(project.mainPicture)}
                      alt={project.title}
                      className="w-full h-auto rounded-xl shadow-lg"
                      onError={(e) => {
                        console.error('Image failed to load for project:', project.title)
                      }}
                    />
                  </div>
                ) : (
                  <div className={`w-full h-64 bg-gradient-to-br ${color} opacity-20 rounded-xl border border-gray-800 flex items-center justify-center`}>
                    <Icon className="h-16 w-16 text-neon-blue" />
                  </div>
                )}
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