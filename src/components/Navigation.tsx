'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Team', href: '/team' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <img 
                src="/DS-Logo-NoBg.png" 
                alt="Devsol Logo" 
                className="h-8 w-8 object-contain"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Devsol
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/admin"
              className="text-gray-400 hover:text-neon-blue transition-colors duration-200 text-sm font-medium"
            >
              Admin
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/contact" className="px-6 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full font-medium hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-neon-blue transition-colors duration-200"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass backdrop-blur-md border-t border-gray-800"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:text-neon-blue transition-colors duration-200 font-medium py-2"
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                href="/admin" 
                onClick={() => setIsOpen(false)}
                className="block text-neon-blue hover:text-neon-cyan transition-colors duration-200 font-medium py-2 border-t border-gray-700 pt-4"
              >
                Admin Dashboard
              </Link>
              <Link href="/contact" className="w-full px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full font-medium hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300">
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navigation 