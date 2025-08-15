'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap, Twitter, Linkedin, Github, Facebook } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/codexiv' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/codexiv' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/codexiv' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/codexiv' }
  ]

  return (
    <footer className="relative bg-black border-t border-gray-800 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-bg opacity-50"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Codexiv</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Leading technology services company specializing in AI development, web solutions, and digital transformation. 
              We help businesses innovate and grow through cutting-edge technology services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-neon-blue transition-colors duration-200">Home</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-neon-blue transition-colors duration-200">Our Services</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-neon-blue transition-colors duration-200">Our Projects</Link></li>
              <li><Link href="/team" className="text-gray-400 hover:text-neon-blue transition-colors duration-200">Our Team</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-neon-blue transition-colors duration-200">About Us</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-neon-blue transition-colors duration-200">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-neon-blue transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-200">AI Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-200">Web Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-200">Cloud Solutions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-200">Digital Transformation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-200">Consulting</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-colors duration-200"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm"
            >
              © {currentYear} Codexiv. All rights reserved.
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex space-x-4"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue/50 transition-all duration-300 group"
                >
                  <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 