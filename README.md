# Codexiv Website

A professional and futuristic website for **Codexiv**, a next-generation technology services company specializing in AI development, web solutions, and digital transformation.

## 🌟 Features

- **Futuristic Design**: Dark theme with neon accents and glass morphism effects
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Smooth Animations**: Framer Motion powered interactions and transitions
- **Service-Focused**: Showcases technology services and consulting offerings
- **Professional Branding**: Modern, sleek design that reflects innovation and expertise

## 🎨 Design Elements

- **Color Scheme**: Dark background with neon blue, purple, and cyan accents
- **Typography**: Clean, modern sans-serif fonts for optimal readability
- **Glass Morphism**: Subtle transparency and backdrop blur effects
- **Animated Backgrounds**: Dynamic particle effects and gradient animations
- **Hover Effects**: Interactive elements with smooth transitions and scaling

## 📱 Pages

1. **Homepage** - Landing page with hero section, services overview, and company highlights
2. **Services Page** - Detailed showcase of technology services offered
3. **About Us Page** - Company mission, values, team, and timeline
4. **Blog/Insights Page** - Industry insights, technology trends, and thought leadership
5. **Contact Page** - Service inquiries, consultation requests, and support
6. **Global Footer** - Company information, quick links, and newsletter signup

## 🔐 Admin Dashboard

**Access URL**: `/admin` (e.g., `https://codexiv.com/admin`)

### **Features**
- **Secure Authentication**: Role-based access control with admin privileges
- **Content Management**: Full CRUD operations for Projects, Team, Blogs, Services
- **Real-time Statistics**: Live dashboard with content counts and metrics
- **File Management**: Upload and manage images, icons, and media files
- **Database Management**: Collection overview, data export, and monitoring
- **Responsive Interface**: Mobile-friendly admin dashboard

### **Content Types Managed**
- **Projects**: Portfolio items with detailed information and media
- **Team Members**: Staff profiles, expertise, and social links
- **Blog Posts**: Articles, categories, tags, and SEO optimization
- **Services**: Service offerings, pricing, and feature management
- **Contact Submissions**: Form inquiries and response tracking
- **Newsletter Subscribers**: Email list management

### **Setup Instructions**
See `ADMIN_SETUP.md` for detailed setup and configuration instructions.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3.4.0
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Appwrite (configured for future use)
- **Deployment**: Vercel-ready

## 🚀 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd codexiv-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Configuration

### Appwrite Setup (Optional)
The project includes Appwrite configuration for future database integration:

1. Create an Appwrite project
2. Set up environment variables in `.env.local`:
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
```

### Environment Variables
Create a `.env.local` file for any additional configuration:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   ├── about/             # About Us page
│   ├── services/          # Services page
│   ├── projects/          # Projects portfolio page
│   ├── team/              # Team members page
│   ├── blog/              # Blog/Insights page
│   ├── contact/           # Contact page
│   └── admin/             # Admin dashboard
│       ├── layout.tsx     # Admin authentication layout
│       └── page.tsx       # Admin dashboard interface
├── components/             # Reusable UI components
│   ├── Navigation.tsx     # Main navigation bar
│   ├── Hero.tsx           # Hero section component
│   ├── About.tsx          # About section component
│   ├── Services.tsx       # Services showcase component
│   ├── Projects.tsx       # Projects showcase component
│   ├── Team.tsx           # Team showcase component
│   ├── AdminAuth.tsx      # Admin authentication component
│   └── Footer.tsx         # Global footer component
├── lib/                    # Utility libraries
│   └── appwrite.ts        # Appwrite client and admin functions
└── globals.css            # Global styles and Tailwind imports
```

## 🎯 Customization

### Colors
Update the color scheme in `tailwind.config.ts`:
```typescript
colors: {
  'neon-blue': '#00d4ff',
  'neon-purple': '#8b5cf6',
  'neon-cyan': '#06b6d4',
  // Add your custom colors
}
```

### Content
- Update company information in component files
- Modify service offerings in `src/components/Services.tsx`
- Customize team information in `src/app/about/page.tsx`
- Update contact details in `src/app/contact/page.tsx`

### Styling
- Modify global styles in `src/app/globals.css`
- Update component-specific styles in individual component files
- Customize animations in `tailwind.config.ts`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
Build the project and deploy the `out` folder:
```bash
npm run build
npm run export  # If using static export
```

## 📱 Responsive Design

The website is fully responsive with:
- Mobile-first approach
- Breakpoint-specific layouts
- Optimized navigation for mobile devices
- Touch-friendly interactions

## 🔍 SEO Features

- Semantic HTML structure
- Meta tags and descriptions
- Open Graph support
- Structured data ready
- Performance optimized

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

Run linting:
```bash
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 💬 Support

For support and questions:
- Email: hello@codexiv.com
- Website: [codexiv.com](https://codexiv.com)

---

**Codexiv** - Building the Future, One Service at a Time
