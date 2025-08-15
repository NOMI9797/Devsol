'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Check, Zap, Shield, Globe, Brain, Cloud, Lock, Sparkles, Users, Target, Award, Rocket } from 'lucide-react'
import Link from 'next/link'

const ServicesPage = () => {
  const services = [
    {
      name: 'AI & Machine Learning Development',
      description: 'Custom AI solutions that transform your business operations and decision-making processes.',
      longDescription: 'Our AI development services leverage cutting-edge machine learning algorithms to create intelligent systems that automate tasks, provide predictive insights, and enhance user experiences. From natural language processing to computer vision, we build AI solutions tailored to your specific business needs.',
      features: [
        'Custom AI Model Development',
        'Machine Learning Pipeline Design',
        'Natural Language Processing',
        'Computer Vision Solutions',
        'Predictive Analytics & Forecasting',
        'AI-Powered Automation',
        'Real-time Data Processing',
        'Model Training & Optimization'
      ],
      icon: Brain,
      color: 'from-neon-blue to-cyan-500',
      badge: 'AI-Powered',
      pricing: 'Starting at $15,000',
      delivery: '8-12 weeks',
      rating: 4.9,
      reviews: 127
    },
    {
      name: 'Cloud Infrastructure & DevOps',
      description: 'Scalable, secure, and high-performance cloud solutions for modern applications.',
      longDescription: 'We design and implement robust cloud infrastructure that scales with your business growth. Our DevOps expertise ensures seamless deployment, monitoring, and maintenance of your applications with industry-leading security standards and 99.9% uptime guarantees.',
      features: [
        'Multi-Cloud Architecture Design',
        'Auto-scaling Infrastructure',
        'Global CDN & Edge Computing',
        'Container Orchestration (Kubernetes)',
        'CI/CD Pipeline Development',
        'Infrastructure as Code (IaC)',
        'Real-time Monitoring & Alerting',
        'Disaster Recovery Planning'
      ],
      icon: Cloud,
      color: 'from-neon-purple to-pink-500',
      badge: 'Cloud-Native',
      pricing: 'Starting at $12,000',
      delivery: '6-10 weeks',
      rating: 4.8,
      reviews: 89
    },
    {
      name: 'Cybersecurity & Compliance',
      description: 'Advanced security measures and AI-powered threat detection to protect your business.',
      longDescription: 'Our cybersecurity services provide comprehensive protection for your digital assets using the latest AI-powered threat detection and prevention technologies. We ensure your systems meet industry compliance standards while maintaining robust security postures.',
      features: [
        'AI-Powered Threat Detection',
        'Real-time Security Monitoring',
        'Zero-day Attack Prevention',
        'Compliance & Audit Preparation',
        'Advanced Firewall Configuration',
        'Vulnerability Assessment',
        'Incident Response Planning',
        'Security Training & Awareness'
      ],
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      badge: 'Enterprise Grade',
      pricing: 'Starting at $18,000',
      delivery: '10-14 weeks',
      rating: 4.9,
      reviews: 156
    },
    {
      name: 'Data Analytics & Business Intelligence',
      description: 'Transform your data into actionable insights that drive business growth and innovation.',
      longDescription: 'We help you unlock the full potential of your data through advanced analytics, machine learning, and business intelligence solutions. From data warehousing to real-time dashboards, we create systems that turn complex data into clear, actionable business insights.',
      features: [
        'Big Data Processing & Analytics',
        'Real-time Dashboard Development',
        'Advanced Data Governance',
        'Machine Learning Integration',
        'Data Quality Management',
        'Automated Reporting Systems',
        'Multi-source Data Integration',
        'Predictive Business Intelligence'
      ],
      icon: Lock,
      color: 'from-orange-500 to-red-500',
      badge: 'Data-Driven',
      pricing: 'Starting at $14,000',
      delivery: '8-12 weeks',
      rating: 4.7,
      reviews: 94
    },
    {
      name: 'Custom Web Development',
      description: 'Modern, scalable web applications built with cutting-edge technologies and best practices.',
      longDescription: 'Our web development services create powerful, user-friendly applications that drive engagement and business results. We use modern frameworks, responsive design principles, and performance optimization to deliver exceptional user experiences.',
      features: [
        'Full-Stack Web Applications',
        'Progressive Web Apps (PWA)',
        'E-commerce Solutions',
        'API Development & Integration',
        'Performance Optimization',
        'SEO & Accessibility Compliance',
        'Cross-platform Compatibility',
        'Scalable Architecture Design'
      ],
      icon: Sparkles,
      color: 'from-yellow-500 to-orange-500',
      badge: 'Modern Tech',
      pricing: 'Starting at $10,000',
      delivery: '6-10 weeks',
      rating: 4.6,
      reviews: 203
    },
    {
      name: 'Digital Transformation Consulting',
      description: 'Strategic guidance to modernize your business operations and technology infrastructure.',
      longDescription: 'We partner with you to assess your current technology landscape and develop comprehensive digital transformation strategies. Our consulting services help you navigate the complex journey of modernizing your business for the digital age.',
      features: [
        'Technology Assessment & Audit',
        'Digital Strategy Development',
        'Change Management Planning',
        'Process Optimization',
        'Technology Roadmap Creation',
        'Vendor Selection & Management',
        'ROI Analysis & Planning',
        'Implementation Support'
      ],
      icon: Globe,
      color: 'from-indigo-500 to-purple-500',
      badge: 'Strategic',
      pricing: 'Starting at $8,000',
      delivery: '4-8 weeks',
      rating: 4.8,
      reviews: 78
    }
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We start by understanding your business goals, challenges, and requirements through comprehensive discovery sessions.',
      icon: Target
    },
    {
      step: '02',
      title: 'Strategy & Design',
      description: 'Our team develops a detailed strategy and creates comprehensive designs that align with your business objectives.',
      icon: Award
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'We build your solution using agile methodologies with regular testing and quality assurance throughout the process.',
      icon: Rocket
    },
    {
      step: '04',
      title: 'Deployment & Support',
      description: 'After thorough testing, we deploy your solution and provide ongoing support and maintenance services.',
      icon: Users
    }
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
              Our Technology Services
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            From AI development to digital transformation, we provide comprehensive technology services 
            that transform your business operations and drive innovation in the digital age.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="glass p-8 rounded-3xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-neon-blue/20 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Header */}
                  <div className="relative z-10 mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-neon-blue to-neon-purple text-white text-xs font-medium rounded-full">
                        {service.badge}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-300">{service.rating}</span>
                        <span className="text-xs text-gray-500">({service.reviews})</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-neon-blue transition-colors duration-300">
                          {service.name}
                        </h3>
                        <p className="text-neon-blue font-semibold">{service.pricing}</p>
                        <p className="text-gray-400 text-sm">Delivery: {service.delivery}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="relative z-10 mb-6">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {service.longDescription}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="relative z-10 mb-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <Check className="h-4 w-4 text-neon-blue flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="relative z-10 flex flex-col sm:flex-row gap-3">
                    <Link href="/contact" className="flex-1 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl font-medium hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 group-hover:scale-105 flex items-center justify-center space-x-2">
                      <span>Get Started</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                    <button className="px-6 py-3 glass border border-neon-blue/20 text-neon-blue rounded-xl font-medium hover:bg-neon-blue hover:text-white transition-all duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
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
              Our Service Delivery Process
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery and exceptional results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="glass p-6 rounded-2xl border border-gray-800 hover:border-neon-blue/50 transition-all duration-300 hover:scale-105 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-neon-blue mb-2">{step.step}</div>
                  <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Let's discuss how our technology services can help you achieve your digital transformation goals 
              and drive innovation in your industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 hover:scale-105">
                Schedule Consultation
              </Link>
              <button className="px-8 py-4 glass border border-neon-blue/20 text-neon-blue rounded-full font-semibold text-lg hover:bg-neon-blue hover:text-white transition-all duration-300">
                Download Service Guide
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default ServicesPage 