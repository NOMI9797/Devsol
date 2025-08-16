'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, ArrowLeft, Tag, Loader2, Share2, BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getDocument, getFileView } from '@/lib/appwrite'
import Link from 'next/link'

interface BlogPost {
  $id: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  imageUrl: string
  createdAt: string
  updatedAt: string
}

const BlogPostPage = () => {
  const params = useParams()
  const router = useRouter()
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchBlogPost(params.id as string)
    }
  }, [params.id])

  const fetchBlogPost = async (postId: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await getDocument('blog-posts', postId)
      setBlogPost(data as unknown as BlogPost)
    } catch (error) {
      console.error('Error fetching blog post:', error)
      setError('Blog post not found or failed to load')
    } finally {
      setLoading(false)
    }
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blogPost?.title || 'Blog Post',
          text: blogPost?.excerpt || '',
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      } catch (error) {
        console.log('Error copying to clipboard:', error)
      }
    }
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-blue mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading Blog Post...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !blogPost) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-16 w-16 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Blog Post Not Found</h1>
            <p className="text-gray-400 mb-8">{error || 'The blog post you are looking for does not exist.'}</p>
            <Link 
              href="/blog" 
              className="inline-flex items-center space-x-2 px-6 py-3 bg-neon-blue hover:bg-neon-blue/80 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>
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
      <div className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 animated-bg"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link 
              href="/blog" 
              className="inline-flex items-center space-x-2 text-neon-blue hover:text-neon-cyan transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>
          </motion.div>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white text-sm font-medium rounded-full">
              {blogPost.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
          >
            {blogPost.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            {blogPost.excerpt}
          </motion.p>

          {/* Meta Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-between gap-4 text-gray-400"
          >
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Devsol Team</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>{formatDate(blogPost.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>{calculateReadTime(blogPost.content)} min read</span>
              </div>
            </div>
            
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Featured Image */}
      {blogPost.imageUrl && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={getFileView(blogPost.imageUrl)}
              alt={blogPost.title}
              className="w-full h-96 md:h-[500px] object-cover"
              onError={(e) => {
                console.error('Image failed to load for blog post:', blogPost.title)
                console.error('imageUrl value:', blogPost.imageUrl)
                console.error('Constructed URL:', getFileView(blogPost.imageUrl))
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      >
        <div className="prose prose-lg prose-invert max-w-none">
          <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
            {blogPost.content}
          </div>
        </div>
      </motion.div>

      {/* Tags Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      >
        <div className="border-t border-gray-800 pt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
          <div className="flex flex-wrap gap-3">
            {blogPost.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-800/50 text-neon-blue text-sm rounded-full border border-gray-700 hover:border-neon-blue/50 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      >
        <div className="glass p-8 rounded-3xl border border-neon-blue/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Enjoyed This Article?
          </h3>
          <p className="text-gray-300 mb-6 text-lg">
            Stay updated with our latest insights on technology, AI, and business innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/blog" 
              className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full font-semibold hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105"
            >
              Read More Articles
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-3 glass border border-neon-blue/20 text-neon-blue rounded-full font-semibold hover:bg-neon-blue hover:text-white transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </motion.div>

      <Footer />
    </>
  )
}

export default BlogPostPage 