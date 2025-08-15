import { Client, Account, Databases, Storage, Functions } from 'appwrite'

const client = new Client()

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('your-project-id') // Replace with your Appwrite project ID

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const functions = new Functions(client)

export { client }

// Database collections configuration
export const DATABASE_ID = 'codexiv-db'
export const COLLECTIONS = {
  USERS: 'users',
  PRODUCTS: 'products',
  BLOG_POSTS: 'blog-posts',
  CONTACT_SUBMISSIONS: 'contact-submissions',
  NEWSLETTER_SUBSCRIBERS: 'newsletter-subscribers'
}

// Storage buckets configuration
export const BUCKETS = {
  PRODUCT_IMAGES: 'product-images',
  BLOG_IMAGES: 'blog-images',
  TEAM_PHOTOS: 'team-photos'
}

// Example functions for common operations
export const createContactSubmission = async (data: {
  name: string
  email: string
  company?: string
  subject: string
  message: string
}) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.CONTACT_SUBMISSIONS,
      'unique()',
      {
        ...data,
        timestamp: new Date().toISOString(),
        status: 'new'
      }
    )
    return response
  } catch (error) {
    console.error('Error creating contact submission:', error)
    throw error
  }
}

export const subscribeToNewsletter = async (email: string) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.NEWSLETTER_SUBSCRIBERS,
      'unique()',
      {
        email,
        subscribedAt: new Date().toISOString(),
        status: 'active'
      }
    )
    return response
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    throw error
  }
}

export const getProducts = async () => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.PRODUCTS
    )
    return response.documents
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const getBlogPosts = async (limit = 10) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.BLOG_POSTS
    )
    return response.documents.slice(0, limit)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    throw error
  }
} 