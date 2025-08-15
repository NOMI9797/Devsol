import { Client, Account, Databases, Storage, OAuthProvider } from 'appwrite'

const client = new Client()

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'your-project-id')

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)

export { client }

// Database collections configuration from environment variables
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'codexiv-db'
export const COLLECTIONS = {
  PROJECTS: process.env.NEXT_PUBLIC_COLLECTION_PROJECTS || 'projects',
  TEAM_MEMBERS: process.env.NEXT_PUBLIC_COLLECTION_TEAM_MEMBERS || 'team-members',
  BLOG_POSTS: process.env.NEXT_PUBLIC_COLLECTION_BLOG_POSTS || 'blog-posts',
  SERVICES: process.env.NEXT_PUBLIC_COLLECTION_SERVICES || 'services',
  CONTACT_SUBMISSIONS: process.env.NEXT_PUBLIC_COLLECTION_CONTACT_SUBMISSIONS || 'contact-submissions',
  USERS: process.env.NEXT_PUBLIC_COLLECTION_USERS || 'users'
}

// Storage buckets configuration from environment variables
export const BUCKETS = {
  PROJECT_IMAGES: process.env.NEXT_PUBLIC_BUCKET_PROJECT_IMAGES || 'project-images',
  BLOG_IMAGES: process.env.NEXT_PUBLIC_BUCKET_BLOG_IMAGES || 'blog-images',
  TEAM_PHOTOS: process.env.NEXT_PUBLIC_BUCKET_TEAM_PHOTOS || 'team-photos'
}

// Company information from environment variables
export const COMPANY_INFO = {
  NAME: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Codexiv',
  EMAIL: process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'hello@codexiv.com',
  PHONE: process.env.NEXT_PUBLIC_COMPANY_PHONE || '+1 (555) 123-4567',
  ADDRESS: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || '123 Innovation Drive, Tech City, TC 12345'
}

// Admin dashboard configuration
export const ADMIN_CONFIG = {
  TITLE: process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_TITLE || 'Codexiv Admin',
  DESCRIPTION: process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_DESCRIPTION || 'Manage your website content, projects, team, and services',
  EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@codexiv.com'
}

// Feature flags
export const FEATURES = {
  ADMIN_DASHBOARD: process.env.NEXT_PUBLIC_ENABLE_ADMIN_DASHBOARD === 'true',
  FILE_UPLOADS: process.env.NEXT_PUBLIC_ENABLE_FILE_UPLOADS === 'true',
  ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  MAINTENANCE_MODE: process.env.NEXT_PUBLIC_ENABLE_MAINTENANCE_MODE === 'true'
}

// Security and performance settings
export const SECURITY_CONFIG = {
  SESSION_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT || '60') * 60 * 1000,
  MAX_FILE_SIZE: parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '10') * 1024 * 1024,
  RATE_LIMIT: parseInt(process.env.NEXT_PUBLIC_RATE_LIMIT || '100')
}

// Development settings
export const DEV_CONFIG = {
  DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',
  LOG_API_RESPONSES: process.env.NEXT_PUBLIC_LOG_API_RESPONSES === 'true'
}

// Google OAuth2 Configuration
export const OAUTH_CONFIG = {
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  // Appwrite OAuth callback URL (where Google redirects to Appwrite)
  APPWRITE_OAUTH_CALLBACK: process.env.NEXT_PUBLIC_APPWRITE_OAUTH_CALLBACK || 'https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google',
  // Your app's callback URL (where Appwrite redirects after OAuth)
  REDIRECT_URI: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI || 'http://localhost:3000/admin',
  SUCCESS_URL: process.env.NEXT_PUBLIC_OAUTH_SUCCESS_URL || 'http://localhost:3000/admin',
  FAILURE_URL: process.env.NEXT_PUBLIC_OAUTH_FAILURE_URL || 'http://localhost:3000/admin?error=auth_failed'
}

// Type definitions for better type safety
interface DocumentData {
  [key: string]: unknown
}

interface User {
  $id: string
  labels?: string[]
  [key: string]: unknown
}

// Content creation functions
export const createProject = async (data: {
  title: string
  longDescription: string
  category: string
  technologies: string[]
  features: string[]
  mainPicture: string
  liveUrl?: string
}) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.PROJECTS,
      'unique()',
      {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    )
    return response
  } catch (error) {
    console.error('Error creating project:', error)
    throw error
  }
}

export const createTeamMember = async (data: {
  name: string
  role: string
  longBio: string
  expertise: string[]
  experience: string
  linkedin?: string
  github?: string
  email: string
  profilePic: string
}) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.TEAM_MEMBERS,
      'unique()',
      {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    )
    return response
  } catch (error) {
    console.error('Error creating team member:', error)
    throw error
  }
}

export const createBlogPost = async (data: {
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  imageUrl: string
}) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.BLOG_POSTS,
      'unique()',
      {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    )
    return response
  } catch (error) {
    console.error('Error creating blog post:', error)
    throw error
  }
}

export const createService = async (data: {
  name: string
  longDescription: string
}) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.SERVICES,
      'unique()',
      {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    )
    return response
  } catch (error) {
    console.error('Error creating service:', error)
    throw error
  }
}

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

// Data retrieval functions
export const getProjects = async () => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.PROJECTS
    )
    return response.documents
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw error
  }
}

export const getTeamMembers = async () => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.TEAM_MEMBERS
    )
    return response.documents
  } catch (error) {
    console.error('Error fetching team members:', error)
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

export const getServices = async () => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.SERVICES
    )
    return response.documents
  } catch (error) {
    console.error('Error fetching services:', error)
    throw error
  }
}

// CRUD operations
export const updateDocument = async (collection: string, documentId: string, data: DocumentData) => {
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
      collection,
      documentId,
      {
        ...data,
        updatedAt: new Date().toISOString()
      }
    )
    return response
  } catch (error) {
    console.error('Error updating document:', error)
    throw error
  }
}

export const deleteDocument = async (collection: string, documentId: string) => {
  try {
    const response = await databases.deleteDocument(
      DATABASE_ID,
      collection,
      documentId
    )
    return response
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}

export const getDocument = async (collection: string, documentId: string) => {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      collection,
      documentId
    )
    return response
  } catch (error) {
    console.error('Error fetching document:', error)
    throw error
  }
}

// Google OAuth2 Authentication Functions
export const createGoogleOAuthSession = async () => {
  try {
    // Create OAuth2 session with Google using Appwrite's OAuth flow
    const session = await account.createOAuth2Session(
      OAuthProvider.Google,
      OAUTH_CONFIG.SUCCESS_URL,
      OAUTH_CONFIG.FAILURE_URL
    )
    return session
  } catch (error) {
    console.error('Error creating Google OAuth session:', error)
    throw error
  }
}

export const handleOAuthCallback = async (url: string) => {
  try {
    // Parse the URL to extract OAuth parameters from Appwrite's callback
    const urlParams = new URLSearchParams(url.split('?')[1])
    const userId = urlParams.get('userId')
    const sessionId = urlParams.get('sessionId')
    
    if (userId && sessionId) {
      // OAuth was successful, get user details
      const user = await getCurrentUser()
      return { success: true, user }
    } else {
      // OAuth failed
      const error = urlParams.get('error')
      throw new Error(error || 'OAuth authentication failed')
    }
  } catch (error) {
    console.error('Error handling OAuth callback:', error)
    throw error
  }
}

export const getOAuthURL = () => {
  // This function is for manual OAuth flow if needed
  // For Appwrite OAuth, we use createOAuth2Session instead
  const clientId = OAUTH_CONFIG.GOOGLE_CLIENT_ID
  const redirectUri = encodeURIComponent(OAUTH_CONFIG.APPWRITE_OAUTH_CALLBACK)
  const scope = encodeURIComponent('email profile openid')
  
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&access_type=offline&prompt=consent`
}

export const getCurrentUser = async () => {
  try {
    return await account.get()
  } catch (error) {
    console.error('Error getting current user:', error)
    throw error
  }
}

export const deleteCurrentSession = async () => {
  try {
    const sessions = await account.listSessions()
    if (sessions.sessions.length > 0) {
      await account.deleteSession(sessions.sessions[0].$id)
    }
  } catch (error) {
    console.error('Error deleting session:', error)
    throw error
  }
}

export const isUserAdmin = async (user: User) => {
  try {
    const userRoles = user.labels || []
    return userRoles.includes('admin')
  } catch (error) {
    console.error('Error checking admin role:', error)
    return false
  }
}

// Enhanced admin access control with real-time role checking
export const checkAdminAccess = async () => {
  try {
    const user = await getCurrentUser()
    const adminStatus = await isUserAdmin(user)
    return { user, isAdmin: adminStatus }
  } catch (error) {
    console.error('Error checking admin access:', error)
    return { user: null, isAdmin: false }
  }
}

// Function to refresh user data and check admin status
export const refreshUserAndCheckAdmin = async () => {
  try {
    // Force refresh user data from Appwrite
    const user = await account.get()
    const adminStatus = await isUserAdmin(user)
    return { user, isAdmin: adminStatus }
  } catch (error) {
    console.error('Error refreshing user data:', error)
    throw error
  }
}

// Function to handle admin role updates
export const handleAdminRoleUpdate = async (userId: string) => {
  try {
    // This function can be called when admin role is updated in Appwrite Console
    // It will refresh the user session and check admin status
    const user = await refreshUserAndCheckAdmin()
    return user
  } catch (error) {
    console.error('Error handling admin role update:', error)
    throw error
  }
} 