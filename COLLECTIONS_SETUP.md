# 🗄️ Codexiv Database Collections Setup Guide

## Overview
This guide provides detailed information about setting up all database collections in Appwrite for your Codexiv website. Each collection has specific attributes, data types, and validation rules.

## 🔐 **Prerequisites**
- Appwrite project created and configured
- Environment variables set up in `.env.local`
- Admin user created with `admin` label

---

## 📊 **Collection 1: Projects** (`projects`)

### **Collection ID**: `projects`
### **Collection Name**: Projects Portfolio
### **Description**: Store all project information for the portfolio

### **Attributes Configuration**

| Attribute Name | Type | Required | Default | Validation | Description |
|----------------|------|----------|---------|------------|-------------|
| `title` | String | ✅ Yes | - | Min: 3, Max: 100 | Project title |
| `longDescription` | String | ✅ Yes | - | Min: 50, Max: 2000 | Detailed project description |
| `category` | String | ✅ Yes | - | Enum: See categories below | Project category |
| `technologies` | String[] | ✅ Yes | [] | Min: 1, Max: 20 | Tech stack used |
| `features` | String[] | ✅ Yes | [] | Min: 1, Max: 15 | Key features |
| `mainPicture` | String | ✅ Yes | - | URL format | Main project image |
| `liveUrl` | String | ❌ No | - | URL format | Live demo URL |
| `createdAt` | String | ✅ Yes | Auto | ISO date format | Creation timestamp |
| `updatedAt` | String | ✅ Yes | Auto | ISO date format | Last update |

### **Category Options**
```json
[
  "AI Development",
  "Cloud Infrastructure", 
  "Cybersecurity",
  "Data Analytics",
  "Web Development",
  "Mobile Development",
  "Consulting",
  "Digital Transformation"
]
```

---

## 👥 **Collection 2: Team Members** (`team-members`)

### **Collection ID**: `team-members`
### **Collection Name**: Team Members
### **Description**: Store team member profiles and information

### **Attributes Configuration**

| Attribute Name | Type | Required | Default | Validation | Description |
|----------------|------|----------|---------|------------|-------------|
| `name` | String | ✅ Yes | - | Min: 2, Max: 100 | Full name |
| `role` | String | ✅ Yes | - | Min: 2, Max: 100 | Job title |
| `longBio` | String | ✅ Yes | - | Min: 100, Max: 2000 | Detailed professional bio |
| `expertise` | String[] | ✅ Yes | [] | Min: 1, Max: 15 | Areas of specialization |
| `experience` | String | ✅ Yes | - | Min: 2, Max: 50 | Years of experience |
| `linkedin` | String | ❌ No | - | URL format | LinkedIn profile URL |
| `github` | String | ❌ No | - | URL format | GitHub profile URL |
| `email` | String | ✅ Yes | - | Email format | Professional email |
| `profilePic` | String | ✅ Yes | - | URL format | Profile picture URL |
| `createdAt` | String | ✅ Yes | Auto | ISO date format | Creation timestamp |
| `updatedAt` | String | ✅ Yes | Auto | ISO date format | Last update |

### **Role Options**
```json
[
  "CEO & Founder", "CTO", "Lead Developer", "Senior Developer",
  "UI/UX Designer", "Data Scientist", "DevOps Engineer",
  "Product Manager", "Business Analyst", "Marketing Manager"
]
```

### **Expertise Areas**
```json
[
  "AI & Machine Learning", "Web Development", "Mobile Development",
  "Cloud Computing", "Cybersecurity", "Data Analytics",
  "DevOps", "UI/UX Design", "Product Management", "Business Strategy"
]
```

---

## 📝 **Collection 3: Blog Posts** (`blog-posts`)

### **Collection ID**: `blog-posts`
### **Collection Name**: Blog Posts
### **Description**: Store blog articles and content

### **Attributes Configuration**

| Attribute Name | Type | Required | Default | Validation | Description |
|----------------|------|----------|---------|------------|-------------|
| `title` | String | ✅ Yes | - | Min: 5, Max: 200 | Blog post title |
| `excerpt` | String | ✅ Yes | - | Min: 20, Max: 300 | Short summary |
| `content` | String | ✅ Yes | - | Min: 100, Max: 50000 | Full blog content |
| `category` | String | ✅ Yes | - | Min: 2, Max: 50 | Blog category |
| `tags` | String[] | ✅ Yes | [] | Min: 1, Max: 15 | Relevant tags |
| `imageUrl` | String | ✅ Yes | - | URL format | Featured image URL |
| `createdAt` | String | ✅ Yes | Auto | ISO date format | Creation timestamp |
| `updatedAt` | String | ✅ Yes | Auto | ISO date format | Last update |

### **Category Options**
```json
[
  "Technology Trends", "AI & Machine Learning", "Web Development",
  "Cloud Computing", "Cybersecurity", "Data Science",
  "Business Insights", "Industry News", "Tutorials", "Case Studies"
]
```

### **Tag Examples**
```json
[
  "AI", "Machine Learning", "Web Development", "React", "Node.js",
  "Cloud", "Security", "Data", "Business", "Innovation",
  "Technology", "Programming", "Design", "UX", "Performance"
]
```

---

## ⚙️ **Collection 4: Services** (`services`)

### **Collection ID**: `services`
### **Collection Name**: Services
### **Description**: Store service offerings and information

### **Attributes Configuration**

| Attribute Name | Type | Required | Default | Validation | Description |
|----------------|------|----------|---------|------------|-------------|
| `name` | String | ✅ Yes | - | Min: 3, Max: 100 | Service name |
| `longDescription` | String | ✅ Yes | - | Min: 100, Max: 2000 | Detailed service description |
| `createdAt` | String | ✅ Yes | Auto | ISO date format | Creation timestamp |
| `updatedAt` | String | ✅ Yes | Auto | ISO date format | Last update |

**Note**: The `icon` will be automatically generated by the system after adding the service, so it's not included in the attributes.

---

## 📧 **Collection 5: Contact Submissions** (`contact-submissions`)

### **Collection ID**: `contact-submissions`
### **Collection Name**: Contact Form Submissions
### **Description**: Store contact form inquiries

### **Attributes Configuration**

| Attribute Name | Type | Required | Default | Validation | Description |
|----------------|------|----------|---------|------------|-------------|
| `name` | String | ✅ Yes | - | Min: 2, Max: 100 | Contact person name |
| `email` | String | ✅ Yes | - | Email format | Contact email |
| `company` | String | ❌ No | - | Min: 2, Max: 100 | Company name |
| `subject` | String | ✅ Yes | - | Min: 5, Max: 200 | Inquiry subject |
| `message` | String | ✅ Yes | - | Min: 10, Max: 2000 | Detailed message |
| `timestamp` | String | ✅ Yes | Auto | ISO date format | Submission time |
| `status` | String | ✅ Yes | 'new' | Enum: new,responded,closed | Inquiry status |

### **Status Options**
```json
[
  "new", "in-progress", "responded", "closed", "spam"
]
```

---

## 🗂️ **Storage Buckets Setup**

### **Bucket 1: Project Images** (`project-images`)
- **Purpose**: Store project main pictures
- **File Types**: jpg, jpeg, png, webp
- **Max File Size**: 10MB
- **Permissions**: Read: public, Write: admin only

### **Bucket 2: Blog Images** (`blog-images`)
- **Purpose**: Store blog post featured images
- **File Types**: jpg, jpeg, png, webp
- **Max File Size**: 5MB
- **Permissions**: Read: public, Write: admin only

### **Bucket 3: Team Photos** (`team-photos`)
- **Purpose**: Store team member profile pictures
- **File Types**: jpg, jpeg, png, webp
- **Max File Size**: 3MB
- **Permissions**: Read: public, Write: admin only

---

## 🔒 **Security & Permissions**

### **Collection Permissions**
- **Read**: Public (for website display)
- **Create**: Admin users only
- **Update**: Admin users only
- **Delete**: Admin users only

### **Storage Bucket Permissions**
- **Read**: Public (for website display)
- **Write**: Admin users only
- **Delete**: Admin users only

### **User Authentication**
- **Admin Access**: Users with `admin` label
- **Session Management**: Automatic timeout
- **Rate Limiting**: 100 requests per minute

---

## 📋 **Setup Checklist**

### **Database Setup**
- [ ] Create database with ID: `codexiv-db`
- [ ] Set database permissions
- [ ] Verify database connection

### **Collections Setup**
- [ ] Create `projects` collection with 8 attributes
- [ ] Create `team-members` collection with 10 attributes
- [ ] Create `blog-posts` collection with 7 attributes
- [ ] Create `services` collection with 4 attributes
- [ ] Create `contact-submissions` collection with 7 attributes

### **Storage Setup**
- [ ] Create `project-images` bucket
- [ ] Create `blog-images` bucket
- [ ] Create `team-photos` bucket
- [ ] Set bucket permissions

### **Validation Setup**
- [ ] Configure required fields
- [ ] Set data type constraints
- [ ] Add pattern validation for emails and URLs
- [ ] Set array length limits
- [ ] Configure enum values for status fields

### **Testing**
- [ ] Test collection creation
- [ ] Test data insertion
- [ ] Test data retrieval
- [ ] Test data update
- [ ] Test data deletion
- [ ] Test file uploads
- [ ] Test permissions

---

## 🚀 **Quick Start Commands**

### **Create Collections via Appwrite Console**
1. Go to your Appwrite project dashboard
2. Navigate to **Databases** → **codexiv-db**
3. Click **Add Collection** for each collection
4. Copy the attribute configuration from above
5. Set permissions and validation rules

### **Test Data Insertion**
```bash
# Test project creation
curl -X POST "https://cloud.appwrite.io/v1/databases/{databaseId}/collections/{collectionId}/documents" \
  -H "X-Appwrite-Project: {projectId}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Project",
    "longDescription": "A test project for validation",
    "category": "Web Development",
    "technologies": ["React", "Node.js"],
    "features": ["Responsive Design", "User Authentication"],
    "mainPicture": "https://example.com/image.jpg"
  }'
```

---

## 🆘 **Troubleshooting**

### **Common Issues**

#### **"Collection Not Found" Error**
- Verify collection ID matches exactly
- Check database permissions
- Ensure collection exists and is accessible

#### **"Attribute Validation Failed" Error**
- Check required field values
- Verify data types match
- Ensure array lengths are within limits
- Validate enum values for status fields

#### **"File Upload Failed" Error**
- Check bucket permissions
- Verify file size limits
- Ensure file types are allowed
- Check storage bucket exists

#### **"Permission Denied" Error**
- Verify user has `admin` label
- Check collection permissions
- Ensure user is authenticated
- Verify session is valid

---

## 📞 **Support**

For additional help with collection setup:
- **Appwrite Documentation**: [docs.appwrite.io](https://docs.appwrite.io)
- **Appwrite Console**: [cloud.appwrite.io](https://cloud.appwrite.io)
- **Community Support**: [Discord](https://discord.gg/appwrite)

**Happy Database Setup! 🎯✨** 