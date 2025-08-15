'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowRight, Eye, Code, Globe, Brain, Shield, Cloud, Filter, Search, Calendar, DollarSign, Clock, Users } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const projects = [
    {
      title: 'AI-Powered E-commerce Platform',
      description: 'A comprehensive e-commerce solution with AI-driven product recommendations, dynamic pricing, and intelligent inventory management.',
      longDescription: 'We developed a cutting-edge e-commerce platform that leverages machine learning algorithms to provide personalized shopping experiences. The system includes intelligent product recommendations, dynamic pricing based on market conditions, and automated inventory management that reduces stockouts by 40%.',
      image: '/projects/ecommerce-ai.jpg',
      category: 'AI Development',
      technologies: ['React', 'Node.js', 'Python', 'TensorFlow', 'MongoDB', 'Redis', 'AWS'],
      features: ['AI Recommendations', 'Dynamic Pricing', 'Inventory Management', 'Analytics Dashboard', 'Mobile App'],
      client: 'TechRetail Inc.',
      duration: '12 weeks',
      budget: '$45,000',
      teamSize: '6 developers',
      icon: Brain,
      color: 'from-neon-blue to-cyan-500',
      liveUrl: 'https://techretail-ai.com',
      githubUrl: 'https://github.com/codexiv/techretail-ai',
      featured: true,
      results: ['40% reduction in stockouts', '25% increase in conversion rate', '30% improvement in customer satisfaction']
    },
    {
      title: 'Cloud-Native Healthcare Platform',
      description: 'A secure, HIPAA-compliant healthcare management system with real-time patient monitoring and telemedicine capabilities.',
      longDescription: 'This enterprise healthcare platform was built with security and compliance as top priorities. We implemented HIPAA-compliant data handling, real-time patient monitoring, and secure telemedicine features that enable healthcare providers to deliver care remotely while maintaining patient privacy.',
      image: '/projects/healthcare-cloud.jpg',
      category: 'Cloud Infrastructure',
      technologies: ['AWS', 'Kubernetes', 'React Native', 'PostgreSQL', 'Redis', 'Docker', 'Terraform'],
      features: ['Patient Management', 'Telemedicine', 'HIPAA Compliance', 'Real-time Monitoring', 'Mobile Apps'],
      client: 'HealthTech Solutions',
      duration: '16 weeks',
      budget: '$68,000',
      teamSize: '8 developers',
      icon: Cloud,
      color: 'from-neon-purple to-pink-500',
      liveUrl: 'https://healthtech-platform.com',
      githubUrl: 'https://github.com/codexiv/healthcare-cloud',
      featured: true,
      results: ['99.9% uptime achieved', 'HIPAA compliance certified', '50% reduction in patient wait times']
    },
    {
      title: 'Cybersecurity Threat Detection System',
      description: 'Advanced AI-powered cybersecurity platform that detects and prevents threats in real-time across enterprise networks.',
      longDescription: 'Our cybersecurity solution uses machine learning to identify and prevent threats before they can cause damage. The system provides real-time monitoring, automated incident response, and comprehensive compliance reporting for enterprise security teams.',
      image: '/projects/cybersecurity-ai.jpg',
      category: 'Cybersecurity',
      technologies: ['Python', 'TensorFlow', 'Elasticsearch', 'React', 'Docker', 'Kafka', 'PostgreSQL'],
      features: ['Threat Detection', 'Real-time Monitoring', 'Incident Response', 'Compliance Reporting', 'Dashboard'],
      client: 'SecureNet Corp',
      duration: '14 weeks',
      budget: '$52,000',
      teamSize: '7 developers',
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      liveUrl: 'https://securenet-threat.com',
      githubUrl: 'https://github.com/codexiv/cybersecurity-ai',
      featured: true,
      results: ['95% threat detection accuracy', '60% faster incident response', 'Zero false positives']
    },
    {
      title: 'Data Analytics Dashboard',
      description: 'Comprehensive business intelligence platform that transforms raw data into actionable insights and predictive analytics.',
      longDescription: 'We built a powerful analytics platform that processes large datasets in real-time to provide business intelligence and predictive insights. The system includes interactive dashboards, automated reporting, and machine learning models for forecasting.',
      image: '/projects/data-analytics.jpg',
      category: 'Data Analytics',
      technologies: ['Python', 'Apache Spark', 'React', 'D3.js', 'PostgreSQL', 'Redis', 'AWS'],
      features: ['Data Visualization', 'Predictive Analytics', 'Real-time Dashboards', 'Custom Reports', 'API'],
      client: 'DataInsight Ltd',
      duration: '10 weeks',
      budget: '$38,000',
      teamSize: '5 developers',
      icon: Globe,
      color: 'from-orange-500 to-red-500',
      liveUrl: 'https://datainsight-dashboard.com',
      githubUrl: 'https://github.com/codexiv/data-analytics',
      featured: false,
      results: ['80% faster data processing', 'Real-time insights delivery', 'Custom reporting automation']
    },
    {
      title: 'Progressive Web App for Logistics',
      description: 'Modern PWA that optimizes logistics operations with real-time tracking, route optimization, and mobile-first design.',
      longDescription: 'This logistics PWA provides real-time tracking, route optimization, and offline capabilities for logistics companies. The app works seamlessly across all devices and provides a native-like experience with offline functionality.',
      image: '/projects/logistics-pwa.jpg',
      category: 'Web Development',
      technologies: ['React', 'PWA', 'Node.js', 'MongoDB', 'Google Maps API', 'Service Workers', 'IndexedDB'],
      features: ['Real-time Tracking', 'Route Optimization', 'Offline Capability', 'Mobile-First Design', 'Push Notifications'],
      client: 'LogiTech Solutions',
      duration: '8 weeks',
      budget: '$32,000',
      teamSize: '4 developers',
      icon: Globe,
      color: 'from-yellow-500 to-orange-500',
      liveUrl: 'https://logitech-pwa.com',
      githubUrl: 'https://github.com/codexiv/logistics-pwa',
      featured: false,
      results: ['35% improvement in delivery efficiency', 'Offline functionality achieved', 'Cross-platform compatibility']
    },
    {
      title: 'Digital Transformation Consulting',
      description: 'Strategic technology assessment and roadmap development for a traditional manufacturing company transitioning to Industry 4.0.',
      longDescription: 'We provided comprehensive digital transformation consulting for a traditional manufacturing company, including technology assessment, process optimization, and implementation roadmap development for their Industry 4.0 transition.',
      image: '/projects/digital-transformation.jpg',
      category: 'Consulting',
      technologies: ['Strategy Development', 'Process Optimization', 'Technology Assessment', 'Change Management', 'ROI Analysis'],
      features: ['Technology Audit', 'Digital Roadmap', 'Implementation Plan', 'ROI Analysis', 'Training Programs'],
      client: 'ManufactureCorp',
      duration: '6 weeks',
      budget: '$25,000',
      teamSize: '3 consultants',
      icon: Brain,
      color: 'from-indigo-500 to-purple-500',
      liveUrl: null,
      githubUrl: null,
      featured: false,
      results: ['Complete digital roadmap created', '30% process efficiency improvement', 'ROI projection of 200%']
    },
    {
      title: 'FinTech Mobile Application',
      description: 'Secure mobile banking application with biometric authentication, real-time transactions, and investment portfolio management.',
      longDescription: 'We developed a comprehensive mobile banking application that provides secure financial services with biometric authentication, real-time transaction processing, and advanced portfolio management features.',
      image: '/projects/fintech-mobile.jpg',
      category: 'Web Development',
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Biometric APIs', 'Stripe'],
      features: ['Biometric Authentication', 'Real-time Transactions', 'Portfolio Management', 'Investment Tools', 'Security'],
      client: 'FinTech Solutions',
      duration: '18 weeks',
      budget: '$75,000',
      teamSize: '9 developers',
      icon: Globe,
      color: 'from-blue-500 to-indigo-500',
      liveUrl: 'https://fintech-mobile.com',
      githubUrl: 'https://github.com/codexiv/fintech-mobile',
      featured: false,
      results: ['Bank-grade security achieved', '99.99% transaction accuracy', '1M+ active users']
    },
    {
      title: 'IoT Smart Home Platform',
      description: 'Connected home automation system with AI-powered energy management and smart device integration.',
      longDescription: 'Our IoT platform connects and manages smart home devices while providing AI-powered energy optimization and automated home management features.',
      image: '/projects/iot-smart-home.jpg',
      category: 'AI Development',
      technologies: ['Python', 'TensorFlow', 'React', 'MQTT', 'MongoDB', 'AWS IoT', 'Docker'],
      features: ['Device Integration', 'Energy Optimization', 'Automated Control', 'Mobile App', 'Analytics'],
      client: 'SmartHome Tech',
      duration: '20 weeks',
      budget: '$85,000',
      teamSize: '10 developers',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      liveUrl: 'https://smarthome-iot.com',
      githubUrl: 'https://github.com/codexiv/iot-smart-home',
      featured: false,
      results: ['25% energy savings achieved', '50+ device types supported', 'Real-time automation']
    }
  ]

  const categories = ['All', 'AI Development', 'Cloud Infrastructure', 'Cybersecurity', 'Data Analytics', 'Web Development', 'Consulting']

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="glass p-8 rounded-3xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-neon-blue/20 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Header */}
                  <div className="relative z-10 mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-neon-blue to-neon-purple text-white text-xs font-medium rounded-full">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="inline-block px-3 py-1 bg-yellow-500 text-black text-xs font-medium rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${project.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <project.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-neon-blue transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-neon-blue font-semibold">{project.budget}</p>
                        <p className="text-gray-400 text-sm">Duration: {project.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="relative z-10 mb-6">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {project.longDescription}
                    </p>
                  </div>

                  {/* Project Stats */}
                  <div className="relative z-10 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Users className="h-4 w-4" />
                        <span>{project.teamSize}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <DollarSign className="h-4 w-4" />
                        <span>{project.budget}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>{project.client}</span>
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="relative z-10 mb-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  {project.results && (
                    <div className="relative z-10 mb-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Key Results</h4>
                      <ul className="space-y-2">
                        {project.results.map((result, resultIndex) => (
                          <li key={resultIndex} className="flex items-center space-x-2 text-sm text-gray-300">
                            <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="relative z-10 flex flex-col sm:flex-row gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl font-medium hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 group-hover:scale-105 flex items-center justify-center space-x-2"
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
                        className="px-6 py-3 glass border border-neon-blue/20 text-neon-blue rounded-xl font-medium hover:bg-neon-blue hover:text-white transition-all duration-300 flex items-center justify-center"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {!project.liveUrl && !project.githubUrl && (
                      <button className="flex-1 px-6 py-3 glass border border-neon-blue/20 text-neon-blue rounded-xl font-medium hover:bg-neon-blue hover:text-white transition-all duration-300">
                        Case Study
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
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
          )}
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