'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap, Twitter, Linkedin, Github, Facebook } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/devsol' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/devsol' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/devsol' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/devsol' }
  ]

  return (
    <footer className="relative bg-black border-t border-gray-800 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-bg opacity-50"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-4 col-span-1 sm:col-span-2 lg:col-span-1 order-1">
            <div className="flex items-center space-x-0.5">
            <div className="relative">
              <img
                src="/DS-Logo-NoBg.png"
                alt="Devsol Logo"
                className="h-7 w-7 object-contain"
              />
            </div>
            <span className="text-2xl font-bold font-[Impact] tracking-wide text-[#CA9146] mt-2">
              evSol
            </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Leading technology services company specializing in AI development, web solutions, and digital transformation. 
              We help businesses innovate and grow through cutting-edge technology services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 order-2">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-neon-blue transition-colors duration-200 text-sm md:text-base">Home</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-neon-blue transition-colors duration-200 text-sm md:text-base">Our Services</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-neon-blue transition-colors duration-200 text-sm md:text-base">Our Projects</Link></li>
              <li><Link href="/team" className="text-gray-400 hover:text-neon-blue transition-colors duration-200 text-sm md:text-base">Our Team</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-neon-blue transition-colors duration-200 text-sm md:text-base">About Us</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-neon-blue transition-colors duration-200 text-sm md:text-base">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-neon-blue transition-colors duration-200 text-sm md:text-base">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4 order-3">
            <h3 className="text-lg font-semibold text-white">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="/services" className="text-gray-400 hover:text-neon-blue transition-colors duration-200 text-sm md:text-base">AI Development</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-neon-blue transition-colors duration-200 text-sm md:text-base">Web Development</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-neon-blue transition-colors duration-200 text-sm md:text-base">Cloud Solutions</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-neon-blue transition-colors duration-200 text-sm md:text-base">Digital Transformation</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-neon-blue transition-colors duration-200 text-sm md:text-base">Consulting</a></li>
            </ul>
            
            {/* Social Links */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-white mb-3">Join us on</h4>
              {/* use Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-blue transition-colors duration-200">
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="col-span-1 sm:col-span-2 lg:col-span-1 order-4"
          >
            <h3 className="text-lg font-semibold text-white mb-4 md:mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4 text-sm md:text-base">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 md:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-colors duration-200 text-sm"
              />
              <button className="w-full px-3 md:px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 text-sm font-medium">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 md:pt-8 mt-8 md:mt-12">
          <div className="text-center">
            <p className="text-gray-400 text-xs md:text-sm">
              © {currentYear} Devsol. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 