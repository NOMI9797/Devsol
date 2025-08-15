'use client'

import { motion } from 'framer-motion'
import { Linkedin, Github, Twitter, Mail, ArrowRight, Award, Users, Rocket, Globe, Cloud, Brain } from 'lucide-react'
import Link from 'next/link'

const Team = () => {
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'CEO & Founder',
      bio: 'Visionary leader with 15+ years in AI and enterprise software. Former CTO at TechCorp with expertise in scaling technology companies.',
      image: '/team/alex-chen.jpg',
      linkedin: 'https://linkedin.com/in/alexchen',
      github: 'https://github.com/alexchen',
      twitter: 'https://twitter.com/alexchen',
      email: 'alex@codexiv.com',
      expertise: ['AI Strategy', 'Enterprise Software', 'Team Leadership', 'Product Vision'],
      experience: '15+ years',
      education: 'MS Computer Science, Stanford',
      achievements: ['Exited 2 companies', '100+ team members led', 'AI patents holder'],
      icon: Rocket,
      color: 'from-neon-blue to-cyan-500'
    },
    {
      name: 'Sarah Rodriguez',
      role: 'CTO',
      bio: 'Expert in cloud architecture and scalable systems. Led engineering teams at major tech companies and specializes in DevOps transformation.',
      image: '/team/sarah-rodriguez.jpg',
      linkedin: 'https://linkedin.com/in/sarahrodriguez',
      github: 'https://github.com/sarahrodriguez',
      twitter: 'https://twitter.com/sarahrodriguez',
      email: 'sarah@codexiv.com',
      expertise: ['Cloud Architecture', 'DevOps', 'System Design', 'Team Scaling'],
      experience: '12+ years',
      education: 'BS Computer Engineering, MIT',
      achievements: ['Led 50+ engineers', '99.9% uptime systems', 'Cloud cost optimization expert'],
      icon: Cloud,
      color: 'from-neon-purple to-pink-500'
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of AI Research',
      bio: 'PhD in Machine Learning from Stanford. Published researcher with 20+ papers in top AI conferences and expert in neural networks.',
      image: '/team/marcus-johnson.jpg',
      linkedin: 'https://linkedin.com/in/marcusjohnson',
      github: 'https://github.com/marcusjohnson',
      twitter: 'https://twitter.com/marcusjohnson',
      email: 'marcus@codexiv.com',
      expertise: ['Machine Learning', 'Neural Networks', 'Research & Development', 'AI Ethics'],
      experience: '8+ years',
      education: 'PhD Machine Learning, Stanford',
      achievements: ['20+ research papers', 'AI conference speaker', 'Open source contributor'],
      icon: Brain,
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Elena Petrov',
      role: 'VP of Product',
      bio: 'Product strategist with deep understanding of enterprise needs. Former Product Director at Microsoft with focus on user experience.',
      image: '/team/elena-petrov.jpg',
      linkedin: 'https://linkedin.com/in/elenapetrov',
      github: 'https://github.com/elenapetrov',
      twitter: 'https://twitter.com/elenapetrov',
      email: 'elena@codexiv.com',
      expertise: ['Product Strategy', 'User Experience', 'Market Research', 'Agile Development'],
      experience: '10+ years',
      education: 'MBA, Harvard Business School',
      achievements: ['Launched 10+ products', 'User satisfaction leader', 'Product mentor'],
      icon: Award,
      color: 'from-orange-500 to-red-500'
    }
  ]

  const stats = [
    { number: '50+', label: 'Years Combined Experience', icon: Award },
    { number: '100+', label: 'Projects Delivered', icon: Users },
    { number: '25+', label: 'Research Papers Published', icon: Rocket },
    { number: '15+', label: 'Patents & Innovations', icon: Globe }
  ]

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
            The brilliant minds behind Codexiv's innovative solutions. Our team combines decades of experience 
            in technology, AI, and business to deliver exceptional results for our clients.
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="glass p-6 rounded-3xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-neon-blue/20 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Member Image Placeholder */}
                  <div className="w-24 h-24 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full mx-auto mb-6 flex items-center justify-center relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-20`}></div>
                    <member.icon className="h-12 w-12 text-neon-blue relative z-10" />
                  </div>

                  {/* Member Info */}
                  <div className="relative z-10 text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-neon-blue font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {member.bio}
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
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="relative z-10 mb-6 text-center text-sm text-gray-400">
                    <p><span className="text-white font-medium">Experience:</span> {member.experience}</p>
                    <p><span className="text-white font-medium">Education:</span> {member.education}</p>
                  </div>

                  {/* Social Links */}
                  <div className="relative z-10 flex justify-center space-x-3">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue/50 transition-all duration-300 group-hover:scale-110"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue/50 transition-all duration-300 group-hover:scale-110"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue/50 transition-all duration-300 group-hover:scale-110"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue/50 transition-all duration-300 group-hover:scale-110"
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