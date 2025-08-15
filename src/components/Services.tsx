'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Brain, Cloud, Shield, Lock, Sparkles, Globe, Check } from 'lucide-react'
import Link from 'next/link'

const Services = () => {
  const services = [
    {
      name: 'AI & Machine Learning Development',
      description: 'Custom AI solutions that transform your business operations and decision-making processes.',
      features: ['Custom AI Models', 'Predictive Analytics', 'Natural Language Processing'],
      icon: Brain,
      color: 'from-neon-blue to-cyan-500',
      badge: 'AI-Powered'
    },
    {
      name: 'Cloud Infrastructure',
      description: 'Scalable and secure cloud solutions to power your applications, data processing, and global reach.',
      features: ['Global CDN', 'Auto-scaling', 'High Availability'],
      icon: Cloud,
      color: 'from-neon-purple to-pink-500',
      badge: 'Cloud-Native'
    },
    {
      name: 'Cybersecurity',
      description: 'Advanced security measures and AI-powered threat detection to protect your sensitive data and infrastructure.',
      features: ['Real-time Monitoring', 'Zero-day Protection', 'Compliance Ready'],
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      badge: 'Enterprise Grade'
    },
    {
      name: 'Data Analytics',
      description: 'Intelligent data management, processing, and analytics to unlock the full potential of your data and drive business growth.',
      features: ['Big Data Processing', 'Real-time Insights', 'Data Governance'],
      icon: Lock,
      color: 'from-orange-500 to-red-500',
      badge: 'Data-Driven'
    },
    {
      name: 'Web Development',
      description: 'Custom website development and AI-powered website builders to create modern, user-friendly, and SEO-optimized digital experiences.',
      features: ['Drag & Drop', 'AI Templates', 'SEO Optimization'],
      icon: Sparkles,
      color: 'from-yellow-500 to-orange-500',
      badge: 'Modern Tech'
    },
    {
      name: 'Digital Transformation',
      description: 'Strategic guidance to modernize your business operations and technology infrastructure for the digital age.',
      features: ['Technology Assessment', 'Strategy Development', 'Implementation Support'],
      icon: Globe,
      color: 'from-indigo-500 to-purple-500',
      badge: 'Strategic'
    }
  ]

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-2xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-neon-blue transition-colors duration-300">
                {service.name}
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-300">
                    <Check className="h-4 w-4 text-neon-blue flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services" className="w-full px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl font-medium hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 group-hover:scale-105 flex items-center justify-center space-x-2">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="glass p-8 rounded-3xl border border-neon-blue/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our team of experts can build tailored solutions that perfectly fit your business needs and requirements. 
              Let's discuss how we can help transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full font-semibold hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105">
                Get Started Today
              </Link>
              <Link href="/services" className="px-8 py-3 glass border border-neon-blue/20 text-neon-blue rounded-full font-semibold hover:bg-neon-blue hover:text-white transition-all duration-300">
                View All Services
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services 