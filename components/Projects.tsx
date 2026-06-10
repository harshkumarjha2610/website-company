'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const projects = [
  { title: 'EcomFlow', description: 'AI-powered e-commerce platform with personalized recommendations, automated inventory, and real-time sales forecasting.', image: 'bg-gradient-to-br from-indigo-900 to-slate-900', tags: ['Next.js', 'AI/ML', 'Node.js', 'Tailwind'], category: 'E-commerce' },
  { title: 'FinanceHub', description: 'Real-time financial analytics dashboard and portfolio management system with customizable reports and high throughput.', image: 'bg-gradient-to-br from-cyan-900 to-slate-900', tags: ['React', 'WebSocket', 'PostgreSQL', 'Redis'], category: 'Finance' },
  { title: 'HealthTrack', description: 'Comprehensive health monitoring, remote diagnostics, and telemedicine platform connecting patients and clinics securely.', image: 'bg-gradient-to-br from-purple-900 to-slate-900', tags: ['React Native', 'Firebase', 'Cloud Functions'], category: 'Healthcare' },
  { title: 'LogisticsOS', description: 'Modern supply chain management system with live tracking, automated dispatching, and route optimization.', image: 'bg-gradient-to-br from-amber-900 to-slate-900', tags: ['Vue.js', 'Maps API', 'GraphQL', 'Docker'], category: 'Logistics' },
  { title: 'CollaborateAI', description: 'Real-time team communication and collaboration tool with automated meeting highlights and task assignment helper.', image: 'bg-gradient-to-br from-rose-900 to-slate-900', tags: ['Next.js', 'WebRTC', 'OpenAI API', 'MongoDB'], category: 'Productivity' },
  { title: 'DataVault', description: 'Highly secure cloud storage and analytics warehouse utilizing advanced encryption protocols and access tracking logs.', image: 'bg-gradient-to-br from-teal-900 to-slate-900', tags: ['Go', 'Kubernetes', 'AWS Key Management'], category: 'Enterprise' },
]

const categories = ['All', 'E-commerce', 'Finance', 'Healthcare', 'Logistics', 'Productivity', 'Enterprise']

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const carouselRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  const filteredProjects = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory)

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(Math.max(0, carouselRef.current.scrollWidth - carouselRef.current.clientWidth))
      }
    }
    const timer = setTimeout(updateWidth, 100)
    window.addEventListener('resize', updateWidth)
    return () => { clearTimeout(timer); window.removeEventListener('resize', updateWidth) }
  }, [filteredProjects])

  return (
    <section
      id="projects"
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight" style={{ color: 'var(--text-heading)' }}>
            Custom <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-sans" style={{ color: 'var(--text-secondary)' }}>
            Explore our portfolio of successful enterprise implementations and custom products
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-smooth"
              style={activeCategory === cat ? {
                background: 'linear-gradient(to right, #22d3ee, #9333ea)',
                color: '#ffffff',
                border: '1px solid transparent',
                boxShadow: '0 0 15px rgba(34,211,238,0.2)',
              } : {
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={e => {
                if (activeCategory !== cat) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.4)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
                }
              }}
              onMouseLeave={e => {
                if (activeCategory !== cat) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Drag hint */}
        <div className="flex justify-center items-center mb-6">
          <p className="text-sm font-sans flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
            <span className="inline-block w-2 h-2 rounded-full bg-[#22d3ee] animate-ping" />
            <span>Drag or swipe left/right to browse our case studies</span>
          </p>
        </div>

        {/* Carousel */}
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
                  <div
                    className="rounded-3xl overflow-hidden transition-smooth flex flex-col h-full"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      boxShadow: 'var(--shadow-card)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.4)'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card-hover)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)'
                    }}
                  >
                    {/* Thumbnail */}
                    <div className={`${project.image} h-48 flex flex-col justify-end p-6 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent z-10" />
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 blur-2xl rounded-full" />
                      <div className="relative z-20 flex flex-col items-start">
                        <span className="text-[11px] uppercase tracking-wider font-extrabold bg-[#22d3ee]/20 border border-[#22d3ee]/35 text-[#67e8f9] px-2.5 py-0.5 rounded-full mb-3">
                          {project.category}
                        </span>
                        <h3 className="text-2xl font-display font-bold text-white tracking-tight">{project.title}</h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <p className="text-[14px] leading-relaxed font-sans mb-6" style={{ color: 'var(--text-secondary)' }}>
                        {project.description}
                      </p>

                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs rounded-md px-2.5 py-1"
                              style={{
                                backgroundColor: 'var(--bg-secondary)',
                                border: '1px solid var(--border)',
                                color: 'var(--text-secondary)',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-4 pt-4 mt-auto" style={{ borderTop: '1px solid var(--border)' }}>
                          <button className="flex items-center gap-1.5 text-sm font-bold text-[#22d3ee] hover:text-[#67e8f9] transition-smooth">
                            <Github size={16} /> Code
                          </button>
                          <button className="flex items-center gap-1.5 text-sm font-bold text-[#22d3ee] hover:text-[#67e8f9] transition-smooth">
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
