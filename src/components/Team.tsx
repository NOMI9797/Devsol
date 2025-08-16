'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Users } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getTeamMembers } from '@/lib/appwrite'
import TeamCard from './TeamCard'

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
            {/* Responsive Grid: 3 on desktop, 2 on mobile */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {teamMembers.map((member, index) => (
                <TeamCard key={member.$id} member={member} index={index} />
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  )
}

export default Team 