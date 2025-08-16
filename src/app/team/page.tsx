'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Linkedin, Github, Mail, ArrowRight, Award, Users, Rocket, Globe, Cloud, Brain, Shield, Calendar, MapPin, GraduationCap, Star, Zap, Target, Code, Lightbulb, Palette, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getTeamMembers, getFileView } from '@/lib/appwrite'

interface TeamMember {
  $id: string
  name: string
  role: string
  longBio: string
  expertise: string[]
  experience: string
  linkedin?: string
  github?: string
  email: string
  profilePic: string
  createdAt: string
  updatedAt: string
}

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      const data = await getTeamMembers()
      setTeamMembers(data as unknown as TeamMember[])
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
    if (roleLower.includes('ai') || roleLower.includes('research')) return Brain
    if (roleLower.includes('product')) return Target
    if (roleLower.includes('design')) return Palette
    if (roleLower.includes('marketing')) return Globe
    if (roleLower.includes('sales')) return Users
    if (roleLower.includes('finance')) return Shield
    return User
  }

  const getGradientForRole = (role: string) => {
    const roleLower = role.toLowerCase()
    if (roleLower.includes('ceo') || roleLower.includes('founder')) return 'from-neon-blue to-cyan-500'
    if (roleLower.includes('cto') || roleLower.includes('engineering')) return 'from-yellow-500 to-orange-500'
    if (roleLower.includes('ai') || roleLower.includes('research')) return 'from-green-500 to-emerald-500'
    if (roleLower.includes('product')) return 'from-orange-500 to-red-500'
    if (roleLower.includes('design')) return 'from-pink-500 to-purple-500'
    if (roleLower.includes('marketing')) return 'from-blue-500 to-indigo-500'
    if (roleLower.includes('sales')) return 'from-green-500 to-blue-500'
    if (roleLower.includes('finance')) return 'from-gray-500 to-slate-500'
    return 'from-neon-blue to-neon-purple'
  }

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
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-transparent to-neon-purple/10"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-neon-blue/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Meet Our Team
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            The brilliant minds behind Devsol's innovative solutions. Our diverse team combines decades of experience
            in technology, AI, and business to deliver exceptional results for our clients.
          </motion.p>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="bg-black py-20 px-4">
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
              {/* Leadership Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-6 text-white">
                  Leadership Team
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Meet the visionary leaders who guide Devsol's mission and drive our company's success.
                </p>
              </motion.div>

              {/* Team Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => {
                  const IconComponent = getIconForRole(member.role)
                  const gradientClass = getGradientForRole(member.role)
                  
                  return (
                    <motion.div
                      key={member.$id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group relative"
                    >
                      {/* Team Member Card */}
                      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 hover:border-neon-blue/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-neon-blue/20">
                        {/* Profile Image */}
                        <div className="relative mb-6">
                          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gray-700 group-hover:border-neon-blue/50 transition-colors duration-300">
                            {member.profilePic ? (
                              <img
                                src={getFileView(member.profilePic)}
                                alt={member.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  console.error('Image failed to load for team member:', member.name)
                                  console.error('profilePic value:', member.profilePic)
                                  console.error('Constructed URL:', getFileView(member.profilePic))
                                }}
                              />
                            ) : (
                              <div className={`w-full h-full bg-gradient-to-r ${gradientClass} flex items-center justify-center`}>
                                <User className="h-12 w-12 text-white" />
                              </div>
                            )}
                          </div>
                          
                          {/* Role Icon */}
                          <div className={`absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r ${gradientClass} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                        </div>

                        {/* Member Info */}
                        <div className="text-center mb-6">
                          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors duration-300">
                            {member.name}
                          </h3>
                          <p className="text-neon-green font-semibold mb-3">{member.role}</p>
                          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                            {member.longBio}
                          </p>
                        </div>

                        {/* Expertise Tags */}
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2 justify-center">
                            {member.expertise.slice(0, 3).map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-3 py-1 bg-gray-800/50 text-neon-blue text-xs rounded-full border border-gray-700 group-hover:border-neon-blue/30 transition-colors duration-300"
                              >
                                {skill}
                              </span>
                            ))}
                            {member.expertise.length > 3 && (
                              <span className="px-3 py-1 bg-gray-800/50 text-gray-400 text-xs rounded-full border border-gray-700">
                                +{member.expertise.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Experience & Contact */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>{member.experience}</span>
                          </div>
                          
                          {/* Social Links */}
                          <div className="flex items-center justify-center space-x-3 pt-3 border-t border-gray-700">
                            {member.linkedin && (
                              <a
                                href={`https://linkedin.com/in/${member.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg transition-all duration-300 hover:scale-110"
                                title="LinkedIn Profile"
                              >
                                <Linkedin className="h-4 w-4" />
                              </a>
                            )}
                            {member.github && (
                              <a
                                href={`https://github.com/${member.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-600/20 hover:bg-gray-600/40 text-gray-400 rounded-lg transition-all duration-300 hover:scale-110"
                                title="GitHub Profile"
                              >
                                <Github className="h-4 w-4" />
                              </a>
                            )}
                            <a
                              href={`mailto:${member.email}`}
                              className="p-2 bg-neon-green/20 hover:bg-neon-green/40 text-neon-green rounded-lg transition-all duration-300 hover:scale-110"
                              title="Send Email"
                            >
                              <Mail className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-center mt-20"
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
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default TeamPage 