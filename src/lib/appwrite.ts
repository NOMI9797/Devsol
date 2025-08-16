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
  ALL_IMAGES: process.env.NEXT_PUBLIC_BUCKET_ALL_IMAGES || 'codexiv-images'
}

// Helper function to get file path based on type
export const getImagePath = (type: 'project' | 'blog' | 'team', filename: string): string => {
  return `${type}/${filename}`
}

// Company information from environment variables
export const COMPANY_INFO = {
  NAME: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Devsol',
  EMAIL: process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'hello@devsol.com',
  PHONE: process.env.NEXT_PUBLIC_COMPANY_PHONE || '+1 (555) 123-4567',
  ADDRESS: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || '123 Innovation Drive, Tech City, TC 12345'
}

// Admin dashboard configuration
export const ADMIN_CONFIG = {
  TITLE: process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_TITLE || 'Devsol Admin',
  DESCRIPTION: process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_DESCRIPTION || 'Manage your website content, projects, team, and services',
  EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@devsol.com'
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
  // Your app's callback URL (where Appwrite redirects after OAuth)
  REDIRECT_URI: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI || 'http://localhost:3000/admin/auth/callback',
  SUCCESS_URL: process.env.NEXT_PUBLIC_OAUTH_SUCCESS_URL || 'http://localhost:3000/admin/auth/callback',
  FAILURE_URL: process.env.NEXT_PUBLIC_OAUTH_FAILURE_URL || 'http://localhost:3000/admin/auth/callback?error=auth_failed'
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

// Helper function to get collection ID from name
const getCollectionId = (collectionName: string): string => {
  const collectionId = (() => {
    switch (collectionName) {
      case 'projects':
        return process.env.NEXT_PUBLIC_COLLECTION_PROJECTS || 'projects'
      case 'team-members':
        return process.env.NEXT_PUBLIC_COLLECTION_TEAM_MEMBERS || 'team-members'
      case 'blog-posts':
        return process.env.NEXT_PUBLIC_COLLECTION_BLOG_POSTS || 'blog-posts'
      case 'services':
        return process.env.NEXT_PUBLIC_COLLECTION_SERVICES || 'services'
      case 'contact-submissions':
        return process.env.NEXT_PUBLIC_COLLECTION_CONTACT_SUBMISSIONS || 'contact-submissions'
      case 'users':
        return process.env.NEXT_PUBLIC_COLLECTION_USERS || 'users'
      default:
        // If it's already an ID, return it as is
        return collectionName
    }
  })()
  
  console.log(`Collection ID for "${collectionName}": ${collectionId}`)
  return collectionId
}

// Helper function for short date format (fits within 20 char limit)
const getShortTimestamp = () => {
  const now = new Date()
  const shortDate = now.toLocaleDateString('en-CA') // Format: YYYY-MM-DD (10 chars)
  const shortTime = now.toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit' 
  }) // Format: HH:MM (5 chars)
  return `${shortDate} ${shortTime}`
}

// Project management functions
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
        createdAt: getShortTimestamp(),
        updatedAt: getShortTimestamp()
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
        createdAt: getShortTimestamp(),
        updatedAt: getShortTimestamp()
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
        createdAt: getShortTimestamp(),
        updatedAt: getShortTimestamp()
      }
    )
    return response
  } catch (error) {
    console.error('Error creating blog post:', error)
    throw error
  }
}

export const updateBlogPost = async (blogId: string, data: {
  title?: string
  excerpt?: string
  content?: string
  category?: string
  tags?: string[]
  imageUrl?: string
}) => {
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.BLOG_POSTS,
      blogId,
      {
        ...data,
        updatedAt: getShortTimestamp()
      }
    )
    return response
  } catch (error) {
    console.error('Error updating blog post:', error)
    throw error
  }
}

export const deleteBlogPost = async (blogId: string) => {
  try {
    const response = await databases.deleteDocument(
      DATABASE_ID,
      COLLECTIONS.BLOG_POSTS,
      blogId
    )
    return response
  } catch (error) {
    console.error('Error deleting blog post:', error)
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
        createdAt: getShortTimestamp(),
        updatedAt: getShortTimestamp()
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
        timestamp: getShortTimestamp(),
        status: 'new'
      }
    )
    return response
  } catch (error) {
    console.error('Error creating contact submission:', error)
    throw error
  }
}

// Data retrieval functions with real-time data
export const getProjects = async (limit?: number) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.PROJECTS,
      limit ? [`limit(${limit})`] : undefined
    )
    return response.documents
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export const getTeamMembers = async (limit?: number) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.TEAM_MEMBERS,
      limit ? [`limit(${limit})`] : undefined
    )
    return response.documents
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

export const getBlogPosts = async (limit?: number) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.BLOG_POSTS,
      limit ? [`limit(${limit})`] : undefined
    )
    return response.documents
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export const getServices = async (limit?: number) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.SERVICES,
      limit ? [`limit(${limit})`] : undefined
    )
    return response.documents
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export const getContactSubmissions = async (limit?: number) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.CONTACT_SUBMISSIONS,
      limit ? [`limit(${limit})`] : undefined
    )
    return response.documents
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return []
  }
}

// Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    const [projects, team, blogs, contacts, services] = await Promise.all([
      getProjects(),
      getTeamMembers(),
      getBlogPosts(),
      getContactSubmissions(),
      getServices()
    ])

    return {
      projects: projects.length,
      team: team.length,
      blogs: blogs.length,
      contacts: contacts.length,
      services: services.length
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return {
      projects: 0,
      team: 0,
      blogs: 0,
      contacts: 0,
      services: 0
    }
  }
}

// Activity interface for type safety
interface Activity {
  type: 'project' | 'team' | 'blog' | 'contact'
  action: 'added' | 'updated' | 'published' | 'received'
  title: string
  timestamp: string
  id: string
}

// Get recent activity
export const getRecentActivity = async (limit = 5): Promise<Activity[]> => {
  try {
    const [projects, team, blogs, contacts] = await Promise.all([
      getProjects(limit),
      getTeamMembers(limit),
      getBlogPosts(limit),
      getContactSubmissions(limit)
    ])

    const activities: Activity[] = []

    // Add recent projects
    projects.slice(0, 3).forEach(project => {
      activities.push({
        type: 'project',
        action: 'added',
        title: project.title,
        timestamp: project.createdAt,
        id: project.$id
      })
    })

    // Add recent team members
    team.slice(0, 2).forEach(member => {
      activities.push({
        type: 'team',
        action: 'added',
        title: member.name,
        timestamp: member.createdAt,
        id: member.$id
      })
    })

    // Add recent blog posts
    blogs.slice(0, 2).forEach(blog => {
      activities.push({
        type: 'blog',
        action: 'published',
        title: blog.title,
        timestamp: blog.createdAt,
        id: blog.$id
      })
    })

    // Add recent contact submissions
    contacts.slice(0, 2).forEach(contact => {
      activities.push({
        type: 'contact',
        action: 'received',
        title: `${contact.name} - ${contact.subject}`,
        timestamp: contact.timestamp,
        id: contact.$id
      })
    })

    // Sort by timestamp and return limited results
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit)
  } catch (error) {
    console.error('Error fetching recent activity:', error)
    return []
  }
}

// CRUD operations
export const updateDocument = async (collection: string, documentId: string, data: DocumentData) => {
  try {
    const collectionId = getCollectionId(collection)
    const response = await databases.updateDocument(
      DATABASE_ID,
      collectionId,
      documentId,
      {
        ...data,
        updatedAt: getShortTimestamp()
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
    const collectionId = getCollectionId(collection)
    const response = await databases.deleteDocument(
      DATABASE_ID,
      collectionId,
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
    const collectionId = getCollectionId(collection)
    const response = await databases.getDocument(
      DATABASE_ID,
      collectionId,
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
    console.log('Creating Google OAuth session...')
    console.log('Success URL:', OAUTH_CONFIG.SUCCESS_URL)
    console.log('Failure URL:', OAUTH_CONFIG.FAILURE_URL)
    
    // Create OAuth2 session with Google using Appwrite's OAuth flow
    const session = await account.createOAuth2Session(
      OAuthProvider.Google,
      OAUTH_CONFIG.SUCCESS_URL,
      OAUTH_CONFIG.FAILURE_URL
    )
    
    console.log('OAuth session created:', session)
    return session
  } catch (error) {
    console.error('Error creating Google OAuth session:', error)
    throw error
  }
}

export const handleOAuthCallback = async (url: string) => {
  try {
    console.log('Handling OAuth callback for URL:', url)
    
    // Parse the URL to extract OAuth parameters from Appwrite's callback
    const urlParams = new URLSearchParams(url.split('?')[1])
    const userId = urlParams.get('userId')
    const sessionId = urlParams.get('sessionId')
    const error = urlParams.get('error')
    
    console.log('Extracted OAuth parameters:', { userId, sessionId, error })
    
    if (error) {
      throw new Error(`OAuth error: ${error}`)
    }
    
    if (userId && sessionId) {
      // OAuth was successful, get user details
      console.log('OAuth successful, getting user details...')
      const user = await getCurrentUser()
      console.log('User details retrieved:', user)
      return { success: true, user }
    } else {
      // Check if we have a session (user might already be authenticated)
      try {
        console.log('No OAuth params, checking if user is already authenticated...')
        const user = await getCurrentUser()
        console.log('User already authenticated:', user)
        return { success: true, user }
      } catch (sessionError) {
        console.log('No existing session found:', sessionError)
        // OAuth failed or incomplete
        throw new Error('OAuth authentication failed - missing userId and sessionId')
      }
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
  const redirectUri = encodeURIComponent(OAUTH_CONFIG.REDIRECT_URI)
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

// Helper function to test bucket accessibility
export const testBucketAccess = async () => {
  try {
    // Try to list files from the bucket to test access
    const files = await storage.listFiles(BUCKETS.ALL_IMAGES, [], '1')
    console.log('Bucket access test successful:', files)
    return true
  } catch (error) {
    console.error('Bucket access test failed:', error)
    return false
  }
}

// Image upload functions
export const uploadProjectImage = async (file: File): Promise<string> => {
  try {
    console.log('Starting project image upload...')
    console.log('File details:', { name: file.name, size: file.size, type: file.type })
    console.log('Bucket ID:', BUCKETS.ALL_IMAGES)
    
    // Test bucket access first
    const bucketAccessible = await testBucketAccess()
    if (!bucketAccessible) {
      throw new Error('Bucket is not accessible. Please check bucket configuration.')
    }
    
    const fileId = 'unique()'
    const filename = `project_${Date.now()}_${file.name}`
    const filePath = getImagePath('project', filename)
    
    console.log('Generated file ID:', fileId)
    console.log('Generated filename:', filename)
    console.log('File path:', filePath)
    
    // Upload file to Appwrite Storage with default permissions
    const response = await storage.createFile(
      BUCKETS.ALL_IMAGES,
      fileId,
      file
      // Don't pass permissions - let Appwrite use default bucket permissions
    )
    
    console.log('File upload successful:', response)
    return response.$id
  } catch (error) {
    console.error('Error uploading project image:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    throw error
  }
}

export const uploadTeamPhoto = async (file: File): Promise<string> => {
  try {
    const fileId = 'unique()'
    const filename = `team_${Date.now()}_${file.name}`
    const filePath = getImagePath('team', filename)
    
    const response = await storage.createFile(
      BUCKETS.ALL_IMAGES,
      fileId,
      file
      // Don't pass permissions - let Appwrite use default bucket permissions
    )
    return response.$id
  } catch (error) {
    console.error('Error uploading team photo:', error)
    throw error
  }
}

export const uploadBlogImage = async (file: File): Promise<string> => {
  try {
    const fileId = 'unique()'
    const filename = `blog_${Date.now()}_${file.name}`
    const filePath = getImagePath('blog', filename)
    
    const response = await storage.createFile(
      BUCKETS.ALL_IMAGES,
      fileId,
      file
      // Don't pass permissions - let Appwrite use default bucket permissions
    )
    return response.$id
  } catch (error) {
    console.error('Error uploading blog image:', error)
    throw error
  }
}

export const getFileView = (fileId: string): string => {
  return storage.getFileView(BUCKETS.ALL_IMAGES, fileId)
}

export const deleteProjectImage = async (fileId: string): Promise<void> => {
  try {
    await storage.deleteFile(BUCKETS.ALL_IMAGES, fileId)
  } catch (error) {
    console.error('Error deleting project image:', error)
    // Don't throw error here as it's not critical for project deletion
  }
} 

export const deleteTeamPhoto = async (fileId: string): Promise<void> => {
  try {
    await storage.deleteFile(BUCKETS.ALL_IMAGES, fileId)
  } catch (error) {
    console.error('Error deleting team photo:', error)
    throw error
  }
}

export const deleteBlogImage = async (fileId: string): Promise<void> => {
  try {
    await storage.deleteFile(BUCKETS.ALL_IMAGES, fileId)
  } catch (error) {
    console.error('Error deleting blog image:', error)
    throw error
  }
} 