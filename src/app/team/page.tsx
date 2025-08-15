'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Linkedin, Github, Twitter, Mail, ArrowRight, Award, Users, Rocket, Globe, Cloud, Brain, Shield, Calendar, MapPin, GraduationCap, Star, Zap, Target, Code, Lightbulb } from 'lucide-react'
import Link from 'next/link'

const TeamPage = () => {
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'CEO & Founder',
      bio: 'Visionary leader with 15+ years in AI and enterprise software. Former CTO at TechCorp with expertise in scaling technology companies from startup to enterprise.',
      longBio: 'Alex is a serial entrepreneur and technology leader who has built and scaled multiple successful technology companies. With a Master\'s degree in Computer Science from Stanford, Alex has deep expertise in artificial intelligence, enterprise software architecture, and team leadership. Before founding Codexiv, Alex served as CTO at TechCorp where he led a team of 100+ engineers and successfully exited the company for $150M. Alex is passionate about democratizing AI technology and making it accessible to businesses of all sizes.',
      image: '/team/alex-chen.jpg',
      linkedin: 'https://linkedin.com/in/alexchen',
      github: 'https://github.com/alexchen',
      twitter: 'https://twitter.com/alexchen',
      email: 'alex@codexiv.com',
      expertise: ['AI Strategy', 'Enterprise Software', 'Team Leadership', 'Product Vision', 'Scaling Companies'],
      experience: '15+ years',
      education: 'MS Computer Science, Stanford University',
      location: 'San Francisco, CA',
      achievements: ['Exited 2 companies', '100+ team members led', 'AI patents holder', 'Forbes 30 Under 30'],
      skills: ['Strategic Planning', 'AI Architecture', 'Team Building', 'Investor Relations', 'Product Strategy'],
      icon: Rocket,
      color: 'from-neon-blue to-cyan-500',
      featured: true
    },
    {
      name: 'Sarah Rodriguez',
      role: 'CTO',
      bio: 'Expert in cloud architecture and scalable systems. Led engineering teams at major tech companies and specializes in DevOps transformation.',
      longBio: 'Sarah is a cloud architecture expert with over 12 years of experience building scalable, high-performance systems. She holds a Bachelor\'s degree in Computer Engineering from MIT and has led engineering teams at companies like Google Cloud and AWS. Sarah specializes in cloud-native architecture, DevOps transformation, and building systems that can handle millions of users. She has successfully migrated dozens of companies to the cloud, reducing infrastructure costs by an average of 40% while improving performance and reliability.',
      image: '/team/sarah-rodriguez.jpg',
      linkedin: 'https://linkedin.com/in/sarahrodriguez',
      github: 'https://github.com/sarahrodriguez',
      twitter: 'https://twitter.com/sarahrodriguez',
      email: 'sarah@codexiv.com',
      expertise: ['Cloud Architecture', 'DevOps', 'System Design', 'Team Scaling', 'Cost Optimization'],
      experience: '12+ years',
      education: 'BS Computer Engineering, MIT',
      location: 'Seattle, WA',
      achievements: ['Led 50+ engineers', '99.9% uptime systems', 'Cloud cost optimization expert', 'AWS Community Builder'],
      skills: ['AWS', 'Kubernetes', 'Terraform', 'System Architecture', 'Team Leadership'],
      icon: Cloud,
      color: 'from-neon-purple to-pink-500',
      featured: true
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of AI Research',
      bio: 'PhD in Machine Learning from Stanford. Published researcher with 20+ papers in top AI conferences and expert in neural networks.',
      longBio: 'Marcus is a leading researcher in artificial intelligence and machine learning, with a PhD from Stanford University. He has published over 20 research papers in top-tier AI conferences including NeurIPS, ICML, and ICLR. Marcus specializes in deep learning, neural network architectures, and AI ethics. Before joining Codexiv, Marcus was a Research Scientist at OpenAI where he contributed to breakthrough models in natural language processing. He is passionate about responsible AI development and ensuring that AI technology benefits humanity.',
      image: '/team/marcus-johnson.jpg',
      linkedin: 'https://linkedin.com/in/marcusjohnson',
      github: 'https://github.com/marcusjohnson',
      twitter: 'https://twitter.com/marcusjohnson',
      email: 'marcus@codexiv.com',
      expertise: ['Machine Learning', 'Neural Networks', 'Research & Development', 'AI Ethics', 'Deep Learning'],
      experience: '8+ years',
      education: 'PhD Machine Learning, Stanford University',
      location: 'Palo Alto, CA',
      achievements: ['20+ research papers', 'AI conference speaker', 'Open source contributor', 'AI ethics advocate'],
      skills: ['TensorFlow', 'PyTorch', 'Python', 'Research Methods', 'AI Ethics'],
      icon: Brain,
      color: 'from-green-500 to-emerald-500',
      featured: true
    },
    {
      name: 'Elena Petrov',
      role: 'VP of Product',
      bio: 'Product strategist with deep understanding of enterprise needs. Former Product Director at Microsoft with focus on user experience.',
      longBio: 'Elena is a product strategy expert with over 10 years of experience in enterprise software and user experience design. She holds an MBA from Harvard Business School and has led product teams at Microsoft, where she was responsible for launching several successful enterprise products. Elena specializes in understanding complex business requirements and translating them into intuitive, user-friendly software solutions. She has a proven track record of improving user satisfaction scores and driving product adoption through thoughtful design and strategic planning.',
      image: '/team/elena-petrov.jpg',
      linkedin: 'https://linkedin.com/in/elenapetrov',
      github: 'https://github.com/elenapetrov',
      twitter: 'https://twitter.com/elenapetrov',
      email: 'elena@codexiv.com',
      expertise: ['Product Strategy', 'User Experience', 'Market Research', 'Agile Development', 'Enterprise Software'],
      experience: '10+ years',
      education: 'MBA, Harvard Business School',
      location: 'Boston, MA',
      achievements: ['Launched 10+ products', 'User satisfaction leader', 'Product mentor', 'Microsoft MVP'],
      skills: ['Product Management', 'UX Design', 'Market Analysis', 'Agile Methodologies', 'Stakeholder Management'],
      icon: Award,
      color: 'from-orange-500 to-red-500',
      featured: true
    },
    {
      name: 'David Kim',
      role: 'Head of Cybersecurity',
      bio: 'Former NSA cybersecurity analyst with expertise in threat detection, incident response, and security architecture.',
      longBio: 'David brings over 15 years of cybersecurity experience, including 8 years as a cybersecurity analyst at the National Security Agency (NSA). He specializes in threat hunting, incident response, and building secure architectures for enterprise systems. David has led security teams that have prevented hundreds of cyber attacks and has developed security protocols used by Fortune 500 companies. He is passionate about making cybersecurity accessible and effective for businesses of all sizes.',
      image: '/team/david-kim.jpg',
      linkedin: 'https://linkedin.com/in/davidkim',
      github: 'https://github.com/davidkim',
      twitter: 'https://twitter.com/davidkim',
      email: 'david@codexiv.com',
      expertise: ['Threat Detection', 'Incident Response', 'Security Architecture', 'Compliance', 'Penetration Testing'],
      experience: '15+ years',
      education: 'MS Cybersecurity, Johns Hopkins University',
      location: 'Washington, DC',
      achievements: ['NSA cybersecurity analyst', 'CISSP certified', 'Security patents holder', 'Conference speaker'],
      skills: ['Threat Hunting', 'SIEM Tools', 'Penetration Testing', 'Security Compliance', 'Incident Response'],
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      featured: false
    },
    {
      name: 'Lisa Wang',
      role: 'Lead Data Scientist',
      bio: 'Expert in big data analytics and machine learning with experience in healthcare, finance, and e-commerce industries.',
      longBio: 'Lisa is a data science leader with expertise in building scalable analytics solutions and machine learning pipelines. She has worked across multiple industries including healthcare, finance, and e-commerce, helping companies unlock the value in their data. Lisa specializes in predictive analytics, data visualization, and building real-time analytics dashboards. She has led teams that have processed petabytes of data and built models that have generated millions of dollars in business value.',
      image: '/team/lisa-wang.jpg',
      linkedin: 'https://linkedin.com/in/lisawang',
      github: 'https://github.com/lisawang',
      twitter: 'https://twitter.com/lisawang',
      email: 'lisa@codexiv.com',
      expertise: ['Big Data Analytics', 'Machine Learning', 'Data Visualization', 'Predictive Modeling', 'Business Intelligence'],
      experience: '9+ years',
      education: 'MS Data Science, UC Berkeley',
      location: 'San Francisco, CA',
      achievements: ['Processed petabytes of data', 'Built ML models generating $10M+ value', 'Data science mentor', 'Kaggle Grandmaster'],
      skills: ['Python', 'Apache Spark', 'TensorFlow', 'Tableau', 'SQL'],
      icon: Globe,
      color: 'from-indigo-500 to-purple-500',
      featured: false
    },
    {
      name: 'James Wilson',
      role: 'Senior Full-Stack Developer',
      bio: 'Full-stack development expert with 8+ years building scalable web applications and mobile apps.',
      longBio: 'James is a versatile full-stack developer who has built everything from simple websites to complex enterprise applications. He specializes in modern web technologies including React, Node.js, and cloud-native development. James has a passion for clean code, performance optimization, and creating intuitive user experiences. He has led development teams and mentored junior developers, always emphasizing best practices and continuous learning.',
      image: '/team/james-wilson.jpg',
      linkedin: 'https://linkedin.com/in/jameswilson',
      github: 'https://github.com/jameswilson',
      twitter: 'https://twitter.com/jameswilson',
      email: 'james@codexiv.com',
      expertise: ['Full-Stack Development', 'React/Node.js', 'Mobile Development', 'Performance Optimization', 'Code Quality'],
      experience: '8+ years',
      education: 'BS Computer Science, University of Texas',
      location: 'Austin, TX',
      achievements: ['Built 50+ applications', 'Performance optimization expert', 'Open source contributor', 'Developer mentor'],
      skills: ['React', 'Node.js', 'TypeScript', 'Docker', 'AWS'],
      icon: Code,
      color: 'from-yellow-500 to-orange-500',
      featured: false
    },
    {
      name: 'Maria Garcia',
      role: 'UX/UI Design Lead',
      bio: 'Creative designer with expertise in user experience, interface design, and design systems for enterprise applications.',
      longBio: 'Maria is a creative designer who specializes in creating intuitive and beautiful user experiences for complex enterprise applications. She has worked with major brands to design interfaces that are both functional and aesthetically pleasing. Maria believes in user-centered design and conducts extensive user research to ensure her designs meet real user needs. She has built design systems that have been adopted by multiple products and teams.',
      image: '/team/maria-garcia.jpg',
      linkedin: 'https://linkedin.com/in/mariagarcia',
      github: null,
      twitter: 'https://twitter.com/mariagarcia',
      email: 'maria@codexiv.com',
      expertise: ['User Experience Design', 'Interface Design', 'Design Systems', 'User Research', 'Prototyping'],
      experience: '7+ years',
      education: 'BFA Design, Parsons School of Design',
      location: 'New York, NY',
      achievements: ['Designed 30+ applications', 'Design system architect', 'User research expert', 'Design mentor'],
      skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
      icon: Lightbulb,
      color: 'from-pink-500 to-rose-500',
      featured: false
    }
  ]

  const departments = [
    { name: 'Leadership', members: teamMembers.filter(m => m.role.includes('CEO') || m.role.includes('VP') || m.role.includes('CTO')) },
    { name: 'Technology', members: teamMembers.filter(m => m.role.includes('Developer') || m.role.includes('Engineer') || m.role.includes('Architect')) },
    { name: 'Research & AI', members: teamMembers.filter(m => m.role.includes('AI') || m.role.includes('Research') || m.role.includes('Data')) },
    { name: 'Design & UX', members: teamMembers.filter(m => m.role.includes('Design') || m.role.includes('UX')) },
    { name: 'Security', members: teamMembers.filter(m => m.role.includes('Security') || m.role.includes('Cybersecurity')) }
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 animated-bg"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
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
            The brilliant minds behind Codexiv's innovative solutions. Our diverse team combines decades of experience 
            in technology, AI, and business to deliver exceptional results for our clients.
          </motion.p>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '50+', label: 'Years Combined Experience', icon: Award },
              { number: '100+', label: 'Projects Delivered', icon: Users },
              { number: '25+', label: 'Research Papers Published', icon: Rocket },
              { number: '15+', label: 'Patents & Innovations', icon: Globe }
            ].map((stat, index) => (
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
          </div>
        </div>
      </section>

      {/* Featured Team Members */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Meet the visionary leaders who guide Codexiv's mission and drive our company's success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {teamMembers.filter(member => member.featured).map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="glass p-8 rounded-3xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-neon-blue/20 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start space-x-6 mb-6">
                      <div className="w-24 h-24 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full flex items-center justify-center relative overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-20`}></div>
                        <member.icon className="h-12 w-12 text-neon-blue relative z-10" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors duration-300">
                          {member.name}
                        </h3>
                        <p className="text-neon-blue font-semibold text-lg mb-2">{member.role}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{member.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{member.experience}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {member.longBio}
                    </p>

                    {/* Education */}
                    <div className="mb-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <GraduationCap className="h-5 w-5 text-neon-blue" />
                        <h4 className="text-lg font-semibold text-white">Education</h4>
                      </div>
                      <p className="text-gray-300">{member.education}</p>
                    </div>

                    {/* Expertise */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {member.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-center space-x-2 text-sm text-gray-300">
                            <Star className="h-4 w-4 text-neon-blue flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-3">
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Team Members by Department */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Our Complete Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Organized by department, discover the full breadth of expertise that drives our success.
            </p>
          </motion.div>

          {departments.map((department, deptIndex) => (
            <motion.div
              key={department.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: deptIndex * 0.1 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <h3 className="text-2xl font-bold text-white mb-8 text-center">{department.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {department.members.map((member, memberIndex) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: memberIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="glass p-6 rounded-2xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-300 hover:scale-105">
                      {/* Member Image Placeholder */}
                      <div className="w-20 h-20 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full mx-auto mb-4 flex items-center justify-center relative overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-20`}></div>
                        <member.icon className="h-10 w-10 text-neon-blue relative z-10" />
                      </div>

                      {/* Member Info */}
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-neon-blue transition-colors duration-300">
                          {member.name}
                        </h4>
                        <p className="text-neon-blue font-semibold mb-2">{member.role}</p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {member.bio}
                        </p>
                      </div>

                      {/* Quick Stats */}
                      <div className="text-center text-sm text-gray-400 mb-4">
                        <p><span className="text-white font-medium">Experience:</span> {member.experience}</p>
                        <p><span className="text-white font-medium">Location:</span> {member.location}</p>
                      </div>

                      {/* Social Links */}
                      <div className="flex justify-center space-x-3">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 glass rounded-full flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue/50 transition-all duration-300"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 glass rounded-full flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue/50 transition-all duration-300"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="w-8 h-8 glass rounded-full flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue/50 transition-all duration-300"
                          >
                            <Mail className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass p-12 rounded-3xl border border-neon-blue/20"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Work with Our Team?
            </h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Our diverse team of experts is ready to help you achieve your technology goals. 
              Let's discuss how we can transform your business together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105">
                Start Your Project
              </Link>
              <Link href="/services" className="px-8 py-4 glass border border-neon-blue/20 text-neon-blue rounded-full font-semibold text-lg hover:bg-neon-blue hover:text-white transition-all duration-300">
                View Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default TeamPage 