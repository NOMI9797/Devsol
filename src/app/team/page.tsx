'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import TeamCard from '@/components/TeamCard'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Award, Rocket, Globe, Code, Brain, Target, Palette, Shield, Workflow } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getTeamMembers } from '@/lib/appwrite'

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      const data = await getTeamMembers()
      setTeamMembers(data as any[])
    } catch (error) {
      console.error('Error fetching team members:', error)
    } finally {
      setLoading(false)
    }
  }

  const getIconForRole = (role: string) => {
    const roleLower = role.toLowerCase()
    if (roleLower.includes('ceo') || roleLower.includes('founder')) return Rocket
    if (roleLower.includes('cto') || roleLower.includes('engineering')) return Code
    if (roleLower.includes('coo') || roleLower.includes('operations')) return Workflow
    if (roleLower.includes('ai') || roleLower.includes('research')) return Brain
    if (roleLower.includes('product')) return Target
    if (roleLower.includes('design')) return Palette
    if (roleLower.includes('marketing')) return Globe
    if (roleLower.includes('sales')) return Users
    if (roleLower.includes('finance')) return Shield
    return Users
  }

  const stats = [
    { number: '50+', label: 'Years Combined Experience', icon: Award },
    { number: '100+', label: 'Projects Delivered', icon: Users },
    { number: '25+', label: 'Research Papers Published', icon: Rocket },
    { number: '15+', label: 'Patents & Innovations', icon: Globe }
  ]

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-blue mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading Team...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <div className="py-16 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-transparent to-neon-purple/10"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-neon-blue/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Meet Our Team
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            The brilliant minds behind Devsol's innovative solutions.
          </motion.p>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="bg-black py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {teamMembers.length === 0 ? (
            <div className="text-center text-gray-400 py-20">
              <Users className="h-32 w-32 mx-auto mb-8 opacity-50" />
              <h3 className="text-3xl font-bold mb-4">No Team Members Yet</h3>
              <p className="text-xl mb-8">Our team is being assembled. Check back soon!</p>
              <Link 
                href="/contact" 
                className="inline-flex items-center space-x-2 px-8 py-4 bg-neon-blue hover:bg-neon-blue/80 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                <span>Get in Touch</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          ) : (
            <>
                          {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {teamMembers.map((member, index) => {
                const IconComponent = getIconForRole(member.role)
                return (
                  <TeamCard key={member.$id} member={member} index={index} roleIcon={IconComponent} />
                )
              })}
            </div>

              {/* Team Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="glass p-6 rounded-2xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-300 hover:scale-105">
                      <stat.icon className="h-8 w-8 text-neon-blue mx-auto mb-4" />
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-black py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Join Our Team?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who are passionate about technology and innovation.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center space-x-2 px-8 py-4 bg-neon-green hover:bg-neon-green/80 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <span>Get in Touch</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default TeamPage 