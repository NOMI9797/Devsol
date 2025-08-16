'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowRight, Eye, Code, Globe, Brain, Shield, Cloud, Filter, Search, Calendar, DollarSign, Clock, Users, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getProjects, getFileView } from '@/lib/appwrite'
import React from 'react'

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

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
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

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.longDescription.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 animated-bg"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Our Portfolio
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Discover how we've helped businesses transform their operations through innovative technology solutions. 
            Each project represents our commitment to excellence and client success.
          </motion.p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
                      : 'glass border border-gray-800 text-gray-300 hover:border-neon-blue/50 hover:text-neon-blue'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-colors duration-200 w-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-20">
                <Loader2 className="h-16 w-16 text-neon-blue animate-spin mx-auto" />
                <p className="text-gray-300 mt-4">Loading projects...</p>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-20">
                <div className="glass p-12 rounded-3xl border border-gray-800">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Error: {error}</h3>
                  <p className="text-gray-300 mb-6">
                    Failed to load projects. Please try again later.
                  </p>
                  <button
                    onClick={fetchProjects}
                    className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full font-medium hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="glass p-12 rounded-3xl border border-gray-800">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">No Projects Found</h3>
                  <p className="text-gray-300 mb-6">
                    Try adjusting your search criteria or category filter to find more projects.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All')
                      setSearchTerm('')
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full font-medium hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
            ) : (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.$id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="glass p-6 rounded-3xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-neon-blue/20 relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getProjectStyle(project.category).color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Project Image */}
                    <div className="relative z-10 mb-4">
                      <div className="w-full h-48 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
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
                        {/* Fallback */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${getProjectStyle(project.category).color} opacity-20 flex items-center justify-center ${project.mainPicture ? 'hidden' : ''}`}>
                          {React.createElement(getProjectStyle(project.category).icon, { className: "h-12 w-12 text-neon-blue" })}
                        </div>
                      </div>
                    </div>
                    
                    {/* Project Title */}
                    <div className="relative z-10 mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-neon-blue transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>

                    {/* Technologies */}
                    <div className="relative z-10 mb-4">
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
                    <div className="relative z-10 flex gap-2">
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
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass p-12 rounded-3xl border border-neon-blue/20"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Let's discuss how we can help you achieve similar results and transform your business 
              with cutting-edge technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105">
                Start Your Project
              </Link>
              <Link href="/services" className="px-8 py-4 glass border border-neon-blue/20 text-neon-blue rounded-full font-semibold text-lg hover:bg-neon-blue hover:text-white transition-all duration-300">
                View Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default ProjectsPage 