'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@codexiv.com',
      description: 'We\'ll get back to you within 24 hours'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm PST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'San Francisco, CA',
      description: 'Schedule an in-person meeting'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      details: '24/7 Available',
      description: 'Round-the-clock technical support'
    }
  ]

  const subjects = [
    'General Inquiry',
    'Service Consultation Request',
    'Custom Development Quote',
    'Technical Support',
    'Project Partnership',
    'Career Opportunities',
    'Other'
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
              Get in Touch
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Ready to transform your business with next-gen technology services? Let's discuss how Codexiv can help you achieve your digital transformation goals.
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Send us a Message</h2>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass p-8 rounded-2xl border border-neon-blue/20 text-center"
                >
                  <CheckCircle className="h-16 w-16 text-neon-blue mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-colors duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-colors duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-colors duration-200"
                        placeholder="Enter your company name"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-colors duration-200"
                      >
                        <option value="">Select a subject</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-colors duration-200 resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  We're here to help you succeed. Reach out to us through any of the channels below, 
                  and our team will be happy to assist you.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="glass p-6 rounded-2xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl flex items-center justify-center">
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
                        <p className="text-neon-blue font-medium mb-1">{info.details}</p>
                        <p className="text-gray-400 text-sm">{info.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Office Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-2xl border border-gray-800"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Office Hours</h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Find Us</h2>
            <p className="text-gray-300 text-lg">
              Visit our headquarters in the heart of San Francisco's tech district
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-3xl border border-gray-800 text-center"
          >
            <div className="w-full h-64 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center mb-6">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-neon-blue mx-auto mb-4" />
                <p className="text-gray-300 text-lg">Interactive Map Coming Soon</p>
                <p className="text-gray-500 text-sm">123 Tech Street, San Francisco, CA 94105</p>
              </div>
            </div>
            <p className="text-gray-400">
              Located in the vibrant South of Market (SoMa) district, just minutes from major tech companies and transportation hubs.
            </p>
          </motion.div>
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
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Let's discuss how we can help transform your business with cutting-edge technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105">
                Schedule a Call
              </button>
              <button className="px-8 py-4 glass border border-neon-blue/20 text-neon-blue rounded-full font-semibold text-lg hover:bg-neon-blue hover:text-white transition-all duration-300">
                Download Brochure
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default ContactPage 