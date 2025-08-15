'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowRight, Eye, Code, Globe, Brain, Shield, Cloud } from 'lucide-react'
import Link from 'next/link'

const Projects = () => {
  const projects = [
    {
      title: 'AI-Powered E-commerce Platform',
      description: 'A comprehensive e-commerce solution with AI-driven product recommendations, dynamic pricing, and intelligent inventory management.',
      image: '/projects/ecommerce-ai.jpg',
      category: 'AI Development',
      technologies: ['React', 'Node.js', 'Python', 'TensorFlow', 'MongoDB'],
      features: ['AI Recommendations', 'Dynamic Pricing', 'Inventory Management', 'Analytics Dashboard'],
      client: 'TechRetail Inc.',
      duration: '12 weeks',
      budget: '$45,000',
      icon: Brain,
      color: 'from-neon-blue to-cyan-500',
      liveUrl: 'https://techretail-ai.com',
      githubUrl: 'https://github.com/codexiv/techretail-ai',
      featured: true
    },
    {
      title: 'Cloud-Native Healthcare Platform',
      description: 'A secure, HIPAA-compliant healthcare management system with real-time patient monitoring and telemedicine capabilities.',
      image: '/projects/healthcare-cloud.jpg',
      category: 'Cloud Infrastructure',
      technologies: ['AWS', 'Kubernetes', 'React Native', 'PostgreSQL', 'Redis'],
      features: ['Patient Management', 'Telemedicine', 'HIPAA Compliance', 'Real-time Monitoring'],
      client: 'HealthTech Solutions',
      duration: '16 weeks',
      budget: '$68,000',
      icon: Cloud,
      color: 'from-neon-purple to-pink-500',
      liveUrl: 'https://healthtech-platform.com',
      githubUrl: 'https://github.com/codexiv/healthcare-cloud',
      featured: true
    },
    {
      title: 'Cybersecurity Threat Detection System',
      description: 'Advanced AI-powered cybersecurity platform that detects and prevents threats in real-time across enterprise networks.',
      image: '/projects/cybersecurity-ai.jpg',
      category: 'Cybersecurity',
      technologies: ['Python', 'TensorFlow', 'Elasticsearch', 'React', 'Docker'],
      features: ['Threat Detection', 'Real-time Monitoring', 'Incident Response', 'Compliance Reporting'],
      client: 'SecureNet Corp',
      duration: '14 weeks',
      budget: '$52,000',
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      liveUrl: 'https://securenet-threat.com',
      githubUrl: 'https://github.com/codexiv/cybersecurity-ai',
      featured: true
    },
    {
      title: 'Data Analytics Dashboard',
      description: 'Comprehensive business intelligence platform that transforms raw data into actionable insights and predictive analytics.',
      image: '/projects/data-analytics.jpg',
      category: 'Data Analytics',
      technologies: ['Python', 'Apache Spark', 'React', 'D3.js', 'PostgreSQL'],
      features: ['Data Visualization', 'Predictive Analytics', 'Real-time Dashboards', 'Custom Reports'],
      client: 'DataInsight Ltd',
      duration: '10 weeks',
      budget: '$38,000',
      icon: Globe,
      color: 'from-orange-500 to-red-500',
      liveUrl: 'https://datainsight-dashboard.com',
      githubUrl: 'https://github.com/codexiv/data-analytics',
      featured: false
    },
    {
      title: 'Progressive Web App for Logistics',
      description: 'Modern PWA that optimizes logistics operations with real-time tracking, route optimization, and mobile-first design.',
      image: '/projects/logistics-pwa.jpg',
      category: 'Web Development',
      technologies: ['React', 'PWA', 'Node.js', 'MongoDB', 'Google Maps API'],
      features: ['Real-time Tracking', 'Route Optimization', 'Offline Capability', 'Mobile-First Design'],
      client: 'LogiTech Solutions',
      duration: '8 weeks',
      budget: '$32,000',
      icon: Globe,
      color: 'from-yellow-500 to-orange-500',
      liveUrl: 'https://logitech-pwa.com',
      githubUrl: 'https://github.com/codexiv/logistics-pwa',
      featured: false
    },
    {
      title: 'Digital Transformation Consulting',
      description: 'Strategic technology assessment and roadmap development for a traditional manufacturing company transitioning to Industry 4.0.',
      image: '/projects/digital-transformation.jpg',
      category: 'Consulting',
      technologies: ['Strategy Development', 'Process Optimization', 'Technology Assessment', 'Change Management'],
      features: ['Technology Audit', 'Digital Roadmap', 'Implementation Plan', 'ROI Analysis'],
      client: 'ManufactureCorp',
      duration: '6 weeks',
      budget: '$25,000',
      icon: Brain,
      color: 'from-indigo-500 to-purple-500',
      liveUrl: null,
      githubUrl: null,
      featured: false
    }
  ]

  const categories = ['All', 'AI Development', 'Cloud Infrastructure', 'Cybersecurity', 'Data Analytics', 'Web Development', 'Consulting']

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Featured Projects</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.filter(project => project.featured).map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="glass p-6 rounded-3xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-neon-blue/20 relative overflow-hidden">
                  {/* Project Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`}></div>
                    <project.icon className="h-16 w-16 text-neon-blue relative z-10" />
                  </div>

                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-neon-blue to-neon-purple text-white text-xs font-medium rounded-full mb-4">
                    {project.category}
                  </span>

                  {/* Project Title */}
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors duration-300">
                    {project.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs text-gray-500">
                    <div>
                      <span className="text-gray-400">Client:</span>
                      <p className="text-white">{project.client}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Duration:</span>
                      <p className="text-white">{project.duration}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Budget:</span>
                      <p className="text-white">{project.budget}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Category:</span>
                      <p className="text-white">{project.category}</p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-white mb-2">Technologies Used:</h5>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 glass border border-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:border-neon-blue/50 hover:text-neon-blue transition-all duration-300 flex items-center justify-center"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View All Projects CTA */}
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
      </div>
    </section>
  )
}

export default Projects 