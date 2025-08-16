'use client'

import { motion } from 'framer-motion'
import { Linkedin, Github, Mail, ArrowRight, Award, Users, Rocket, Globe, Cloud, Brain, User } from 'lucide-react'
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

const Team = () => {
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

  const stats = [
    { number: '50+', label: 'Years Combined Experience', icon: Award },
    { number: '100+', label: 'Projects Delivered', icon: Users },
    { number: '25+', label: 'Research Papers Published', icon: Rocket },
    { number: '15+', label: 'Patents & Innovations', icon: Globe }
  ]

  if (loading) {
    return (
      <section id="team" className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-blue mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading Team...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="team" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-bg"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The brilliant minds behind Devsol's innovative solutions. Our team combines decades of experience
            in AI, cloud computing, and product development to deliver exceptional results for our clients.
          </p>
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
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

        {/* Team Members Grid */}
        {teamMembers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <Users className="h-32 w-32 mx-auto mb-8 opacity-50" />
            <h3 className="text-3xl font-bold mb-4 text-white">No Team Members Yet</h3>
            <p className="text-xl text-gray-400 mb-8">Our team is being assembled. Check back soon!</p>
            <Link 
              href="/contact" 
              className="inline-flex items-center space-x-2 px-8 py-4 bg-neon-blue hover:bg-neon-blue/80 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <span>Get in Touch</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.slice(0, 4).map((member, index) => (
                <motion.div
                  key={member.$id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="glass p-6 rounded-3xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-neon-blue/20 relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-blue to-neon-purple opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
                    
                    {/* Member Image */}
                    <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center relative overflow-hidden rounded-full">
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
                        <div className="w-full h-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                          <User className="h-12 w-12 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Member Info */}
                    <div className="relative z-10 text-center mb-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-neon-blue font-semibold mb-3">{member.role}</p>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                        {member.longBio}
                      </p>
                    </div>

                    {/* Expertise */}
                    <div className="relative z-10 mb-6">
                      <h4 className="text-sm font-semibold text-white mb-3 text-center">Expertise</h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.expertise.slice(0, 3).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.expertise.length > 3 && (
                          <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">
                            +{member.expertise.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="relative z-10 flex justify-center space-x-3">
                      {member.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${member.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue/50 transition-all duration-300 group-hover:scale-110"
                          title="LinkedIn Profile"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={`https://github.com/${member.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue/50 transition-all duration-300 group-hover:scale-110"
                          title="GitHub Profile"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue/50 transition-all duration-300 group-hover:scale-110"
                          title="Send Email"
                        >
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* View Full Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass p-8 rounded-3xl border border-neon-blue/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Want to Know More About Our Team?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Discover detailed profiles, achievements, and the stories behind our team members. 
              Learn how our diverse expertise drives innovation and client success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/team" className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full font-semibold hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                <span>Meet the Full Team</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/contact" className="px-8 py-3 glass border border-neon-blue/20 text-neon-blue rounded-full font-semibold hover:bg-neon-blue hover:text-white transition-all duration-300">
                Work With Us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Team 