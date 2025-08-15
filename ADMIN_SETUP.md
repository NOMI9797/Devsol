# 🚀 Codexiv Admin Dashboard Setup Guide

## Overview
This guide will help you set up the admin dashboard for your Codexiv website, allowing you to manage Projects, Team Members, Blogs, Services, and Contacts dynamically.

## 🔐 **Step 1: Appwrite Setup**

### 1.1 Create Appwrite Account
- Go to [cloud.appwrite.io](https://cloud.appwrite.io)
- Sign up for a free account
- Create a new project

### 1.2 Project Configuration
- Copy your **Project ID** from the dashboard
- Note your **Project Endpoint** (usually `https://cloud.appwrite.io/v1`)

### 1.3 Database Setup
Create a database with ID: `codexiv-db`

### 1.4 Collections Setup
Create the following collections:

#### **Projects Collection** (`projects`)
```json
{
  "title": "string",
  "description": "string", 
  "longDescription": "string",
  "category": "string",
  "technologies": "string[]",
  "features": "string[]",
  "client": "string",
  "duration": "string",
  "budget": "string",
  "teamSize": "string",
  "icon": "string",
  "color": "string",
  "liveUrl": "string?",
  "githubUrl": "string?",
  "featured": "boolean",
  "results": "string[]",
  "createdAt": "string",
  "updatedAt": "string",
  "status": "string"
}
```

#### **Team Members Collection** (`team-members`)
```json
{
  "name": "string",
  "role": "string",
  "bio": "string",
  "longBio": "string",
  "expertise": "string[]",
  "experience": "string",
  "education": "string",
  "location": "string",
  "achievements": "string[]",
  "skills": "string[]",
  "icon": "string",
  "color": "string",
  "featured": "boolean",
  "linkedin": "string?",
  "github": "string?",
  "twitter": "string?",
  "email": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "status": "string"
}
```

#### **Blog Posts Collection** (`blog-posts`)
```json
{
  "title": "string",
  "excerpt": "string",
  "content": "string",
  "author": "string",
  "category": "string",
  "tags": "string[]",
  "featured": "boolean",
  "imageUrl": "string?",
  "publishedAt": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "status": "string",
  "readTime": "number"
}
```

#### **Services Collection** (`services`)
```json
{
  "name": "string",
  "description": "string",
  "longDescription": "string",
  "features": "string[]",
  "icon": "string",
  "color": "string",
  "badge": "string",
  "pricing": "string",
  "delivery": "string",
  "rating": "number",
  "reviews": "number",
  "featured": "boolean",
  "createdAt": "string",
  "updatedAt": "string",
  "status": "string"
}
```

#### **Contact Submissions Collection** (`contact-submissions`)
```json
{
  "name": "string",
  "email": "string",
  "company": "string?",
  "subject": "string",
  "message": "string",
  "timestamp": "string",
  "status": "string"
}
```

#### **Newsletter Subscribers Collection** (`newsletter-subscribers`)
```json
{
  "email": "string",
  "subscribedAt": "string",
  "status": "string"
}
```

### 1.5 Storage Buckets
Create the following storage buckets:
- `project-images` - For project screenshots and images
- `blog-images` - For blog post images
- `team-photos` - For team member profile pictures
- `service-icons` - For service icons and graphics

### 1.6 Authentication Setup
- Enable **Email/Password** authentication
- Create your admin user account
- Set user labels: Add `admin` label to your user

## ⚙️ **Step 2: Environment Configuration**

### 2.1 Create `.env.local` file
```bash
cp .env.local.example .env.local
```

### 2.2 Update Environment Variables
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=codexiv-db
NEXT_PUBLIC_ADMIN_EMAIL=your_admin_email@codexiv.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🔑 **Step 3: Admin User Setup**

### 3.1 Create Admin Account
1. Go to your Appwrite project dashboard
2. Navigate to **Users** section
3. Create a new user with your Gmail address
4. Set a strong password

### 3.2 Assign Admin Role
1. Click on your user account
2. Go to **Labels** section
3. Add label: `admin`
4. Save changes

## 🚀 **Step 4: Access Admin Dashboard**

### 4.1 URL Access
- **Admin Dashboard**: `http://localhost:3000/admin`
- **Admin Login**: Automatically redirects if not authenticated

### 4.2 Login Process
1. Enter your Gmail address
2. Enter your password
3. System verifies admin role
4. Access granted to dashboard

## 📊 **Step 5: Dashboard Features**

### 5.1 Overview Tab
- **Statistics Dashboard**: Real-time counts of all content
- **Quick Actions**: Fast access to common tasks
- **System Status**: Database and service health

### 5.2 Projects Management
- **Add New Project**: Create project with all details
- **Edit Projects**: Modify existing project information
- **Delete Projects**: Remove projects from portfolio
- **Featured Projects**: Mark projects as featured

### 5.3 Team Management
- **Add Team Member**: Create new team profiles
- **Edit Profiles**: Update team member information
- **Manage Roles**: Assign and modify team roles
- **Profile Photos**: Upload and manage team images

### 5.4 Blog Management
- **Create Posts**: Write and publish blog articles
- **Content Editor**: Rich text editing capabilities
- **Category Management**: Organize posts by topics
- **SEO Optimization**: Meta tags and descriptions

### 5.5 Services Management
- **Add Services**: Create new service offerings
- **Pricing Management**: Update service costs
- **Feature Lists**: Manage service features
- **Service Icons**: Upload and manage graphics

### 5.6 Contact Management
- **View Submissions**: See all contact form entries
- **Response Tracking**: Mark inquiries as responded
- **Export Data**: Download contact information
- **Status Management**: Track inquiry progress

### 5.7 Database Management
- **Collection Overview**: View all database collections
- **Data Export**: Backup and export data
- **Performance Monitoring**: Database health metrics
- **Storage Management**: File and image storage

## 🔒 **Step 6: Security Features**

### 6.1 Role-Based Access
- Only users with `admin` label can access dashboard
- Automatic role verification on each request
- Session management and timeout

### 6.2 Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF token validation

### 6.3 Audit Logging
- All admin actions are logged
- User activity tracking
- Change history for content
- Security event monitoring

## 🚀 **Step 7: Deployment**

### 7.1 Production Environment
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_production_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=codexiv-db
NEXT_PUBLIC_ADMIN_EMAIL=admin@codexiv.com
NEXT_PUBLIC_SITE_URL=https://codexiv.com
```

### 7.2 Vercel Deployment
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy automatically

### 7.3 Custom Domain
- **Admin URL**: `https://codexiv.com/admin`
- **SSL Certificate**: Automatic HTTPS
- **CDN**: Global content delivery

## 🧪 **Step 8: Testing**

### 8.1 Functionality Testing
- [ ] Admin login works
- [ ] Role verification functions
- [ ] CRUD operations for all content types
- [ ] File uploads work correctly
- [ ] Data validation functions

### 8.2 Security Testing
- [ ] Non-admin users cannot access dashboard
- [ ] Session management works correctly
- [ ] Input validation prevents malicious data
- [ ] Logout functions properly

### 8.3 Performance Testing
- [ ] Dashboard loads quickly
- [ ] Large datasets handle properly
- [ ] Image uploads are optimized
- [ ] Database queries are efficient

## 🆘 **Troubleshooting**

### Common Issues

#### **"Access Denied" Error**
- Verify user has `admin` label in Appwrite
- Check environment variables are correct
- Ensure database collections exist

#### **"Collection Not Found" Error**
- Verify collection IDs match exactly
- Check database permissions
- Ensure collection names are correct

#### **Authentication Failures**
- Verify email/password combination
- Check Appwrite project configuration
- Ensure authentication is enabled

#### **File Upload Issues**
- Check storage bucket permissions
- Verify file size limits
- Ensure bucket exists and is accessible

## 📞 **Support**

### Getting Help
- **Documentation**: Check Appwrite docs
- **Community**: Appwrite Discord server
- **Issues**: GitHub repository issues
- **Email**: admin@codexiv.com

### Useful Links
- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Console](https://cloud.appwrite.io)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 🎯 **Quick Start Checklist**

- [ ] Appwrite project created
- [ ] Database and collections set up
- [ ] Admin user created with `admin` label
- [ ] Environment variables configured
- [ ] Local development server running
- [ ] Admin dashboard accessible at `/admin`
- [ ] Login working with admin credentials
- [ ] All dashboard tabs functional
- [ ] CRUD operations tested
- [ ] Deployed to production

**Congratulations! 🎉 Your admin dashboard is now ready to manage your Codexiv website content dynamically!** 