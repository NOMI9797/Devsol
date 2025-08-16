'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Brain, Cloud, Shield, Lock, Sparkles, Globe, Check, Settings, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getServices } from '@/lib/appwrite'

interface Service {
  $id: string
  name: string
  longDescription: string
  createdAt: string
  updatedAt: string
}

const Services = () => {
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

  if (loading) {
    return (
      <section id="services" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-neon-blue mx-auto mb-4" />
            <p className="text-gray-400">Loading services...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="services" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={fetchServices}
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
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-bg"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-white">
            Our Core Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive technology services designed to transform your business and drive innovation.
          </p>
        </motion.div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const { icon: Icon, color, badge } = getServiceStyle(service.name)
              return (
                <motion.div
                  key={service.$id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass p-6 rounded-2xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-neon-blue transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4 line-clamp-3">
                    {service.longDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-gradient-to-r from-neon-blue to-neon-purple text-white text-xs rounded-full font-medium">
                      {badge}
                    </span>
                    <Link
                      href="/contact"
                      className="flex items-center space-x-2 text-neon-blue hover:text-neon-purple transition-colors duration-300 group"
                    >
                      <span className="text-sm font-medium">Learn More</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
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
              <h3 className="text-2xl font-bold text-white mb-2">No Services Yet</h3>
              <p className="text-gray-300 mb-6">
                We're preparing our service offerings. Check back soon to see what we can do for you!
              </p>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass p-8 rounded-3xl border border-neon-blue/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's discuss how our services can help transform your business and drive innovation.
            </p>
            <Link href="/contact" className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full font-semibold hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105">
              <span>Start Your Project</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services 