'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Users, Target, Award, Rocket, Globe, Heart, Zap, Shield } from 'lucide-react'
import { getFileView } from '@/lib/appwrite'

const AboutPage = () => {
  const values = [
    {
      title: 'Innovation First',
      description: 'We push boundaries and embrace cutting-edge technologies to solve tomorrow\'s problems today.',
      icon: Rocket
    },
    {
      title: 'Quality Excellence',
      description: 'Every product we build meets the highest standards of quality, performance, and user experience.',
      icon: Award
    },
    {
      title: 'Client Success',
      description: 'Your success is our success. We partner with you to achieve extraordinary results.',
      icon: Users
    },
    {
      title: 'Global Impact',
      description: 'We believe technology should benefit humanity and create positive change worldwide.',
      icon: Globe
    },
    {
      title: 'Integrity & Trust',
      description: 'We operate with complete transparency and build lasting relationships based on trust.',
      icon: Shield
    },
    {
      title: 'Passion for Technology',
      description: 'We love what we do and it shows in every product we create and every client we serve.',
      icon: Heart
    }
  ]

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
              About Devsol
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            We're a visionary technology services company dedicated to building the future through innovative AI and web solutions. 
            Our mission is to transform ideas into powerful, scalable digital solutions that drive business growth and user engagement.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-white">
                Our Mission
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                To democratize cutting-edge technology and make AI-powered solutions accessible to businesses of all sizes through 
                expert consulting, custom development, and comprehensive digital transformation services.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Through our services, we're building bridges between complex technology and practical business solutions, 
                enabling companies to thrive in the digital age with custom-built, scalable digital solutions.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Vision 2030</h3>
                  <p className="text-gray-400">Leading the AI revolution in enterprise software</p>
                </div>
              </div>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl border border-gray-800"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Why Choose Devsol?</h3>
              <div className="space-y-4">
                {[
                  '15+ Years of Industry Experience',
                  '100+ Enterprise Clients Worldwide',
                  '99.9% Uptime Guarantee',
                  '24/7 Expert Support',
                  'AI-First Approach',
                  'Global Infrastructure'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-neon-blue" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Core Values
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do and every decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-2xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The brilliant minds behind Devsol's innovative products and solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* The Team component will be rendered here */}
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
              Ready to Build the Future Together?
            </h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Join hundreds of companies already using Devsol products to transform their business operations and user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105">
                Get Started Today
              </button>
              <button className="px-8 py-4 glass border border-neon-blue/20 text-neon-blue rounded-full font-semibold text-lg hover:bg-neon-blue hover:text-white transition-all duration-300">
                Contact Our Team
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default AboutPage 