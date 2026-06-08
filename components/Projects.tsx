'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const projects = [
  {
    title: 'EcomFlow',
    description: 'AI-powered e-commerce platform with personalized recommendations, automated inventory, and real-time sales forecasting.',
    image: 'bg-gradient-to-br from-indigo-900 to-slate-900',
    tags: ['Next.js', 'AI/ML', 'Node.js', 'Tailwind'],
    category: 'E-commerce'
  },
  {
    title: 'FinanceHub',
    description: 'Real-time financial analytics dashboard and portfolio management system with customizable reports and high throughput.',
    image: 'bg-gradient-to-br from-cyan-900 to-slate-900',
    tags: ['React', 'WebSocket', 'PostgreSQL', 'Redis'],
    category: 'Finance'
  },
  {
    title: 'HealthTrack',
    description: 'Comprehensive health monitoring, remote diagnostics, and telemedicine platform connecting patients and clinics securely.',
    image: 'bg-gradient-to-br from-purple-900 to-slate-900',
    tags: ['React Native', 'Firebase', 'Cloud Functions'],
    category: 'Healthcare'
  },
  {
    title: 'LogisticsOS',
    description: 'Modern supply chain management system with live tracking, automated dispatching, and route optimization.',
    image: 'bg-gradient-to-br from-amber-900 to-slate-900',
    tags: ['Vue.js', 'Maps API', 'GraphQL', 'Docker'],
    category: 'Logistics'
  },
  {
    title: 'CollaborateAI',
    description: 'Real-time team communication and collaboration tool with automated meeting highlights and task assignment helper.',
    image: 'bg-gradient-to-br from-rose-900 to-slate-900',
    tags: ['Next.js', 'WebRTC', 'OpenAI API', 'MongoDB'],
    category: 'Productivity'
  },
  {
    title: 'DataVault',
    description: 'Highly secure cloud storage and analytics warehouse utilizing advanced encryption protocols and access tracking logs.',
    image: 'bg-gradient-to-br from-teal-900 to-slate-900',
    tags: ['Go', 'Kubernetes', 'AWS Key Management'],
    category: 'Enterprise'
  },
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const carouselRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  const categories = ['All', 'E-commerce', 'Finance', 'Healthcare', 'Logistics', 'Productivity', 'Enterprise']

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        const scrollW = carouselRef.current.scrollWidth
        const clientW = carouselRef.current.clientWidth
        // Make sure width is at least 0
        setWidth(Math.max(0, scrollW - clientW))
      }
    }
    
    // Run after a small delay to let DOM render
    const timer = setTimeout(updateWidth, 100)
    window.addEventListener('resize', updateWidth)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateWidth)
    }
  }, [filteredProjects])

  return (
    <section id="projects" className="py-24 bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight">
            Custom <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-sans">
            Explore our portfolio of successful enterprise implementations and custom products
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-smooth border ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-accent to-purple-600 border-transparent text-white shadow-glow-indigo'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.06] text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Drag Hint */}
        <div className="flex justify-center items-center mb-6">
          <p className="text-sm text-gray-400 font-sans flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-ping" />
            <span>Drag or swipe left/right to browse our case studies</span>
          </p>
        </div>

        {/* Carousel Viewport Wrapper */}
        <div className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none" ref={carouselRef}>
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            whileTap={{ cursor: 'grabbing' }}
            className="flex gap-8 py-4 px-2"
            style={{ width: 'max-content' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-[300px] sm:w-[380px] flex-shrink-0 flex flex-col h-full card-hover group"
                >
                  <div className="bg-slate-900/30 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden hover:border-accent/40 transition-smooth shadow-glass flex flex-col h-full">
                    
                    {/* Thumbnail Image placeholder */}
                    <div className={`${project.image} h-48 flex flex-col justify-end p-6 relative overflow-hidden`}>
                      {/* Shadow overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent z-10" />
                      
                      {/* Glowing effect inside image */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 blur-2xl rounded-full" />
                      
                      <div className="relative z-20 flex flex-col items-start">
                        <span className="text-[11px] uppercase tracking-wider font-extrabold bg-accent/20 border border-accent/35 text-accent-light px-2.5 py-0.5 rounded-full mb-3">
                          {project.category}
                        </span>
                        <h3 className="text-2xl font-display font-bold text-white tracking-tight">{project.title}</h3>
                      </div>
                    </div>
                    
                    {/* Card Content details */}
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <p className="text-[14px] text-gray-400 leading-relaxed font-sans mb-6">
                        {project.description}
                      </p>
                      
                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="text-xs bg-white/[0.02] border border-white/5 text-gray-300 rounded-md px-2.5 py-1">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex gap-4 border-t border-white/5 pt-4 mt-auto">
                          <button className="flex items-center gap-1.5 text-sm font-bold text-accent hover:text-accent-light transition-smooth">
                            <Github size={16} /> Code
                          </button>
                          <button className="flex items-center gap-1.5 text-sm font-bold text-accent hover:text-accent-light transition-smooth">
                            <ExternalLink size={16} /> Live Demo
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
