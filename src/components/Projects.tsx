'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowRight, Eye, Code, Globe, Brain, Shield, Cloud, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getProjects, getFileView } from '@/lib/appwrite'

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

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getProjects()
      setProjects(data as unknown as Project[])
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError('Failed to load projects')
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

  // Get unique categories from projects
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]

  if (loading) {
    return (
      <section id="projects" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-neon-blue mx-auto mb-4" />
            <p className="text-gray-400">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={fetchProjects}
              className="px-6 py-3 bg-neon-blue text-white rounded-lg hover:bg-neon-blue/80 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-bg"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-white">
            Our Portfolio
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover how we've helped businesses transform their operations through innovative technology solutions. 
            Each project represents our commitment to excellence and client success.
          </p>
        </motion.div>

        {/* Featured Projects */}
        {projects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Featured Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.slice(0, 3).map((project, index) => {
                const { icon: Icon, color } = getProjectStyle(project.category)
                return (
                  <motion.div
                    key={project.$id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="glass p-6 rounded-3xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-neon-blue/20 relative overflow-hidden">
                      {/* Project Image */}
                      <div className="w-full h-48 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden">
                        {project.mainPicture ? (
                          <img
                            src={getFileView(project.mainPicture)}
                            alt={project.title}
                            className="w-full h-full object-cover rounded-t-xl"
                            onError={(e) => {
                              console.error('Image failed to load for project:', project.title)
                              console.error('mainPicture value:', project.mainPicture)
                              console.error('Constructed URL:', getFileView(project.mainPicture))
                            }}
                          />
                        ) : null}
                        {/* Fallback icon - hidden by default, shown when image fails */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 flex items-center justify-center ${project.mainPicture ? 'hidden' : ''}`}>
                          <Icon className="h-16 w-16 text-neon-blue relative z-10" />
                        </div>
                      </div>

                      {/* Project Title */}
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors duration-300">
                        {project.title}
                      </h4>

                      {/* Technologies */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-gray-800 text-gray-500 text-xs rounded-full">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-3 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg text-xs font-medium hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 flex items-center justify-center space-x-1"
                          >
                            <Eye className="h-3 w-3" />
                            <span>Live Demo</span>
                          </a>
                        )}
                        <Link
                          href={`/projects/${project.$id}`}
                          className={`px-3 py-2 glass border border-gray-700 text-gray-300 rounded-lg text-xs font-medium hover:border-neon-blue/50 hover:text-neon-blue transition-all duration-300 flex items-center justify-center ${project.liveUrl ? 'flex-1' : 'w-full'}`}
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <div className="glass p-12 rounded-3xl border border-gray-800">
              <Code className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No Projects Yet</h3>
              <p className="text-gray-300 mb-6">
                We're working on some amazing projects. Check back soon to see our latest work!
              </p>
            </div>
          </motion.div>
        )}

        {/* View All Projects CTA */}
        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="glass p-8 rounded-3xl border border-neon-blue/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Want to See More of Our Work?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Explore our complete portfolio of projects, case studies, and success stories. 
                See how we've helped businesses across industries achieve their digital transformation goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/projects" className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full font-semibold hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                  <span>View All Projects</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/contact" className="px-8 py-3 glass border border-neon-blue/20 text-neon-blue rounded-full font-semibold hover:bg-neon-blue hover:text-white transition-all duration-300">
                  Start Your Project
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Projects 