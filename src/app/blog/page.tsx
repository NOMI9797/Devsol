'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react'

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of AI in Enterprise Software',
      excerpt: 'Discover how artificial intelligence is revolutionizing business operations and what this means for the future of enterprise software.',
      content: 'Artificial Intelligence is no longer just a buzzword—it\'s fundamentally changing how businesses operate. From predictive analytics to automated decision-making, AI is becoming the backbone of modern enterprise software...',
      author: 'Devsol Team',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'AI & Machine Learning',
      tags: ['AI', 'Enterprise', 'Innovation', 'Technology'],
      image: '/blog/ai-enterprise.jpg'
    },
    {
      id: 2,
      title: 'Building Scalable Cloud Infrastructure',
      excerpt: 'Learn the best practices for designing and implementing cloud infrastructure that can grow with your business needs.',
      content: 'Cloud infrastructure has become the foundation of modern applications. But building a scalable, reliable, and cost-effective cloud architecture requires careful planning and execution...',
      author: 'Devsol Team',
      date: '2024-01-10',
      readTime: '7 min read',
      category: 'Cloud Computing',
      tags: ['Cloud', 'Infrastructure', 'Scalability', 'DevOps'],
      image: '/blog/cloud-infrastructure.jpg'
    },
    {
      id: 3,
      title: 'Cybersecurity in the Age of AI',
      excerpt: 'Explore how AI is both a threat and a solution in modern cybersecurity, and what businesses need to know to stay protected.',
      content: 'As AI technology advances, so do the threats it poses to cybersecurity. However, AI is also becoming our greatest ally in detecting and preventing cyber attacks...',
      author: 'Devsol Team',
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'Cybersecurity',
      tags: ['Security', 'AI', 'Threat Detection', 'Protection'],
      image: '/blog/cybersecurity-ai.jpg'
    },
    {
      id: 4,
      title: 'Data-Driven Decision Making',
      excerpt: 'How businesses can leverage big data and analytics to make better, more informed decisions that drive growth.',
      content: 'In today\'s digital world, data is the new currency. Companies that can effectively collect, analyze, and act on their data have a significant competitive advantage...',
      author: 'Devsol Team',
      date: '2023-12-28',
      readTime: '8 min read',
      category: 'Data Analytics',
      tags: ['Data', 'Analytics', 'Business Intelligence', 'Decision Making'],
      image: '/blog/data-analytics.jpg'
    },
    {
      id: 5,
      title: 'The Rise of No-Code Development',
      excerpt: 'How no-code platforms are democratizing software development and enabling non-technical users to build powerful applications.',
      content: 'No-code development platforms are changing the game for businesses that need custom software solutions but don\'t have the resources for traditional development...',
      author: 'Devsol Team',
      date: '2023-12-20',
      readTime: '4 min read',
      category: 'Development',
      tags: ['No-Code', 'Development', 'Democratization', 'Software'],
      image: '/blog/no-code.jpg'
    },
    {
      id: 6,
      title: 'Global Collaboration in Remote Teams',
      excerpt: 'Best practices for building and managing distributed teams that can collaborate effectively across different time zones and cultures.',
      content: 'The future of work is global and remote. Companies that can effectively manage distributed teams have access to talent pools worldwide...',
      author: 'Devsol Team',
      date: '2023-12-15',
      readTime: '6 min read',
      category: 'Team Management',
      tags: ['Remote Work', 'Collaboration', 'Global Teams', 'Management'],
      image: '/blog/global-collaboration.jpg'
    }
  ]

  const categories = [
    'All',
    'AI & Machine Learning',
    'Cloud Computing',
    'Cybersecurity',
    'Data Analytics',
    'Development',
    'Team Management'
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 animated-bg"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6 text-white">
            Devsol Blog
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Insights, trends, and expert perspectives on technology services, digital transformation, and business innovation.
          </motion.p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  category === 'All'
                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
                    : 'glass border border-gray-800 text-gray-300 hover:border-neon-blue/50 hover:text-neon-blue'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="glass p-6 rounded-3xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-neon-blue/20 relative overflow-hidden">
                  {/* Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <Tag className="h-12 w-12 text-neon-blue mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">Blog Image</p>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-neon-blue to-neon-purple text-white text-xs font-medium rounded-full mb-4">
                    {post.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Button */}
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl font-medium hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 group-hover:scale-105 flex items-center justify-center space-x-2">
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
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
              Stay Updated with Our Latest Insights
            </h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Get the latest technology trends, AI insights, and business innovation tips delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-gray-900 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-colors duration-200"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full font-semibold hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default BlogPage 