'use client'

import { motion } from 'framer-motion'
import { Linkedin, Github, Mail, User } from 'lucide-react'
import { getFileView } from '@/lib/appwrite'
import { LucideIcon } from 'lucide-react'

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

interface TeamCardProps {
  member: TeamMember
  index: number
  roleIcon?: LucideIcon
}

const TeamCard = ({ member, index, roleIcon }: TeamCardProps) => {
  const IconComponent = roleIcon || User

  return (
    <motion.div
      key={member.$id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* Professional Team Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-white/10 hover:border-neon-blue/30 relative overflow-hidden">
        {/* Card Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Profile Image - No Border */}
        <div className="relative z-10 flex justify-center mb-4">
          <div className="w-28 h-28 md:w-32 md:h-32 relative overflow-hidden rounded-full shadow-lg">
            {member.profilePic ? (
              <img
                src={getFileView(member.profilePic)}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  console.error('Image failed to load for team member:', member.name)
                  console.error('profilePic value:', member.profilePic)
                  console.error('Constructed URL:', getFileView(member.profilePic))
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <User className="h-16 w-16 text-white" />
              </div>
            )}

            {/* Role Icon - Bottom of image on border without background */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <IconComponent className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Member Information - Role first, then name */}
        <div className="relative z-10 text-center mb-3">
          <p className="text-neon-blue font-semibold text-lg md:text-xl mb-1">{member.role}</p>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors duration-300">
            {member.name}
          </h3>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed line-clamp-2 mb-3">
            {member.longBio}
          </p>

          {/* Experience */}
          {member.experience && (
            <div className="mb-3">
              <p className="text-gray-400 text-xs">
                <span className="text-white font-semibold">Experience:</span> {member.experience}
              </p>
            </div>
          )}
        </div>

        {/* Expertise Tags */}
        <div className="relative z-10 mb-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {member.expertise.slice(0, 3).map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-3 py-1 bg-gray-800/80 text-gray-300 text-xs rounded-full border border-gray-700 hover:border-neon-blue/50 transition-colors duration-300"
              >
                {skill}
              </span>
            ))}
            {member.expertise.length > 3 && (
              <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue text-xs rounded-full border border-neon-blue/30">
                +{member.expertise.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Animated Social Links - Hidden by default, show on hover */}
        <div className="relative z-10">
          <div className="flex justify-center space-x-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-50">
            {member.linkedin && (
              <motion.a
                href={`https://linkedin.com/in/${member.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                title="LinkedIn Profile"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
            )}
            {member.github && (
              <motion.a
                href={`https://github.com/${member.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                title="GitHub Profile"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-5 w-5" />
              </motion.a>
            )}
            {member.email && (
              <motion.a
                href={`mailto:${member.email}`}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                title="Send Email"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            )}
          </div>

          {/* Fallback static social links for when no hover is available */}
          <div className="flex justify-center space-x-4 opacity-100 group-hover:opacity-0 transition-all duration-300 md:hidden">
            {member.linkedin && (
              <a
                href={`https://linkedin.com/in/${member.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
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
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                title="GitHub Profile"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                title="Send Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TeamCard
