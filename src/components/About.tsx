'use client'

import { motion } from 'framer-motion'
import { Target, Users, Rocket, Award, Zap, ArrowRight, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getTeamMembers, getFileView } from '@/lib/appwrite'
import Link from 'next/link'

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

const About = () => {
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
    { number: '500+', label: 'Projects Completed', icon: Rocket },
    { number: '50+', label: 'Happy Clients', icon: Users },
    { number: '24/7', label: 'Support Available', icon: Rocket },
    { number: '99.9%', label: 'Client Satisfaction', icon: Award }
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-bg"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              About Devsol
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We&apos;re a visionary technology company dedicated to building the future through innovative AI and web solutions. 
            Our mission is to transform ideas into powerful, scalable products that drive business growth and user engagement.
          </p>
        </motion.div>

        {/* Stats Grid */}
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

        {/* Mission & Values */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-white">
                Transforming Businesses Through Technology
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                At Devsol, we&apos;re not just developers—we&apos;re strategic partners in your digital transformation journey. 
                We combine cutting-edge AI technology with proven development methodologies to deliver solutions that drive real business value.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Our team of experts works closely with you to understand your unique challenges, design custom solutions, 
                and implement them with precision and care. From startups to enterprise clients, we&apos;ve helped businesses 
                across industries achieve their digital goals.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Our Promise</h3>
                  <p className="text-gray-400">Delivering excellence in every project</p>
                </div>
              </div>
            </motion.div>

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
                  '15+ Years of Development Experience',
                  '100+ Successful Projects Delivered',
                  '99.9% Client Satisfaction Rate',
                  '24/7 Project Support & Maintenance',
                  'AI-First Development Approach',
                  'End-to-End Service Delivery'
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

        {/* Team Preview Section */}
        {teamMembers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Meet Our Expert Team
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The brilliant minds behind Devsol's innovative solutions. Our diverse team combines decades of experience
                in technology, AI, and business to deliver exceptional results.
              </p>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.slice(0, 6).map((member, index) => (
                <motion.div
                  key={member.$id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="glass p-6 rounded-2xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-300 hover:scale-105">
                    {/* Profile Image */}
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-gray-700 group-hover:border-neon-blue/50 transition-colors duration-300 mb-4">
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
                          <User className="h-10 w-10 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Member Info */}
                    <div className="text-center">
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-neon-blue transition-colors duration-300">
                        {member.name}
                      </h4>
                      <p className="text-neon-green font-semibold mb-3">{member.role}</p>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                        {member.longBio}
                      </p>
                      
                      {/* Expertise Preview */}
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {member.expertise.slice(0, 2).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-gray-800/50 text-neon-blue text-xs rounded-full border border-gray-700"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.expertise.length > 2 && (
                          <span className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded-full border border-gray-700">
                            +{member.expertise.length - 2} more
                          </span>
                        )}
                      </div>

                      {/* Experience */}
                      <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                        <span>{member.experience}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Team Button */}
            <div className="text-center mt-8">
              <Link 
                href="/team" 
                className="inline-flex items-center space-x-2 px-6 py-3 bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue/30 text-neon-blue rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                <span>View Full Team</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}

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
              Ready to Build the Future Together?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join hundreds of companies already using Devsol services to transform their business operations and achieve digital excellence.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full font-semibold hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105">
              Get Started Today
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 