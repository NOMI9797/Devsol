'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Check, Zap, Shield, Globe, Brain, Cloud, Lock, Sparkles, Users, Target, Award, Rocket, Settings, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getServices } from '@/lib/appwrite'
import React from 'react'

interface Service {
  $id: string
  name: string
  longDescription: string
  createdAt: string
  updatedAt: string
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getServices()
      setServices(data as unknown as Service[])
    } catch (err) {
      console.error('Error fetching services:', err)
      setError('Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  // Get icon and color based on service name
  const getServiceStyle = (serviceName: string) => {
    const name = serviceName.toLowerCase()
    if (name.includes('ai') || name.includes('machine learning') || name.includes('intelligence')) {
      return { icon: Brain, color: 'from-neon-blue to-cyan-500', badge: 'AI-Powered' }
    } else if (name.includes('cloud') || name.includes('infrastructure') || name.includes('devops')) {
      return { icon: Cloud, color: 'from-neon-purple to-pink-500', badge: 'Cloud-Native' }
    } else if (name.includes('security') || name.includes('cyber') || name.includes('protection')) {
      return { icon: Shield, color: 'from-green-500 to-emerald-500', badge: 'Enterprise Grade' }
    } else if (name.includes('data') || name.includes('analytics') || name.includes('business intelligence')) {
      return { icon: Lock, color: 'from-orange-500 to-red-500', badge: 'Data-Driven' }
    } else if (name.includes('web') || name.includes('development') || name.includes('app')) {
      return { icon: Sparkles, color: 'from-yellow-500 to-orange-500', badge: 'Modern Tech' }
    } else if (name.includes('transformation') || name.includes('strategy') || name.includes('consulting')) {
      return { icon: Globe, color: 'from-indigo-500 to-purple-500', badge: 'Strategic' }
    } else {
      return { icon: Settings, color: 'from-neon-blue to-neon-purple', badge: 'Professional' }
    }
  }

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We start by understanding your business goals, challenges, and requirements through comprehensive discovery sessions.',
      icon: Target
    },
    {
      step: '02',
      title: 'Strategy & Design',
      description: 'Our team develops a detailed strategy and creates comprehensive designs that align with your business objectives.',
      icon: Award
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'We build your solution using agile methodologies with regular testing and quality assurance throughout the process.',
      icon: Rocket
    },
    {
      step: '04',
      title: 'Deployment & Support',
      description: 'After thorough testing, we deploy your solution and provide ongoing support and maintenance services.',
      icon: Users
    }
  ]

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-neon-blue animate-spin" />
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-300 text-lg">{error}</p>
      </main>
    )
  }

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
              Our Technology Services
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            From AI development to digital transformation, we provide comprehensive technology services 
            that transform your business operations and drive innovation in the digital age.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {services.map((service, index) => {
                const { icon, color, badge } = getServiceStyle(service.name)
                return (
                  <motion.div
                    key={service.$id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="glass p-8 rounded-3xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-neon-blue/20 relative overflow-hidden">
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                      
                      {/* Header */}
                      <div className="relative z-10 mb-6">
                        <div className="flex items-start justify-between mb-4">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-neon-blue to-neon-purple text-white text-xs font-medium rounded-full">
                            {badge}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-300">4.9</span>
                            <span className="text-xs text-gray-500">(127)</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            {React.createElement(icon, { className: "h-8 w-8 text-white" })}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-neon-blue transition-colors duration-300">
                              {service.name}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="relative z-10 mb-6">
                        <p className="text-gray-300 leading-relaxed mb-4">
                          {service.longDescription}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="relative z-10 mb-6">
                        <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-center space-x-3">
                            <Check className="h-4 w-4 text-neon-blue flex-shrink-0" />
                            <span className="text-gray-300 text-sm">Custom AI Model Development</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Check className="h-4 w-4 text-neon-blue flex-shrink-0" />
                            <span className="text-gray-300 text-sm">Machine Learning Pipeline Design</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Check className="h-4 w-4 text-neon-blue flex-shrink-0" />
                            <span className="text-gray-300 text-sm">Natural Language Processing</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Check className="h-4 w-4 text-neon-blue flex-shrink-0" />
                            <span className="text-gray-300 text-sm">Computer Vision Solutions</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Check className="h-4 w-4 text-neon-blue flex-shrink-0" />
                            <span className="text-gray-300 text-sm">Predictive Analytics & Forecasting</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Check className="h-4 w-4 text-neon-blue flex-shrink-0" />
                            <span className="text-gray-300 text-sm">AI-Powered Automation</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Check className="h-4 w-4 text-neon-blue flex-shrink-0" />
                            <span className="text-gray-300 text-sm">Real-time Data Processing</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Check className="h-4 w-4 text-neon-blue flex-shrink-0" />
                            <span className="text-gray-300 text-sm">Model Training & Optimization</span>
                          </div>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="relative z-10 flex flex-col sm:flex-row gap-3">
                        <Link href="/contact" className="flex-1 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl font-medium hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 group-hover:scale-105 flex items-center justify-center space-x-2">
                          <span>Get Started</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                        <button className="px-6 py-3 glass border border-neon-blue/20 text-neon-blue rounded-xl font-medium hover:bg-neon-blue hover:text-white transition-all duration-300">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center py-20"
            >
              <div className="glass p-12 rounded-3xl border border-gray-800">
                <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">No Services Available</h3>
                <p className="text-gray-300 mb-6">
                  We're currently preparing our service offerings. Check back soon to see what we can do for you!
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Our Service Delivery Process
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery and exceptional results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="glass p-6 rounded-2xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-300 hover:scale-105 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-neon-blue mb-2">{step.step}</div>
                  <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Let's discuss how our technology services can help you achieve your digital transformation goals 
              and drive innovation in your industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105">
                Schedule Consultation
              </Link>
              <button className="px-8 py-4 glass border border-neon-blue/20 text-neon-blue rounded-full font-semibold text-lg hover:bg-neon-blue hover:text-white transition-all duration-300">
                Download Service Guide
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default ServicesPage 