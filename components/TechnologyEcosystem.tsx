'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const ecosystem = [
  { category: 'Frontend',       color: 'from-cyan-400 to-blue-500',     accentColor: '#22d3ee', tech: ['React', 'Next.js', 'TypeScript', 'Angular'] },
  { category: 'Backend',        color: 'from-emerald-400 to-teal-500',  accentColor: '#34d399', tech: ['Node.js', 'Python', 'Java', '.NET'] },
  { category: 'Cloud & DevOps', color: 'from-blue-400 to-indigo-500',   accentColor: '#60a5fa', tech: ['AWS', 'Azure', 'GCP', 'Docker'] },
  { category: 'AI & Data',      color: 'from-violet-400 to-fuchsia-500',accentColor: '#a78bfa', tech: ['OpenAI', 'Claude', 'Gemini', 'LangChain'] },
  { category: 'Database',       color: 'from-rose-400 to-orange-500',   accentColor: '#fb923c', tech: ['PostgreSQL', 'MongoDB', 'Redis', 'Snowflake'] },
]

export default function TechnologyEcosystem() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <section
      id="ecosystem"
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, var(--border) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          opacity: 0.5,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight" style={{ color: 'var(--text-heading)' }}>
            Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Ecosystem</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-sans leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            We architect future-proof digital platforms utilizing a curated stack of world-class frameworks and cloud infrastructure.
          </p>
        </motion.div>

        <div className="relative">
          {/* Core node */}
          <div
            className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full z-20 items-center justify-center"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '2px solid var(--border-strong)',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            <div className="text-center">
              <span className="block font-display font-bold text-lg" style={{ color: 'var(--text-heading)' }}>Core</span>
              <span className="block w-2 h-2 rounded-full bg-[#22d3ee] mx-auto mt-2 animate-ping" />
            </div>
            <svg className="absolute w-[800px] h-[800px] pointer-events-none -z-10" style={{ opacity: 0.08 }} viewBox="0 0 800 800">
              <circle cx="400" cy="400" r="250" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" className="animate-[spin_60s_linear_infinite]" />
              <circle cx="400" cy="400" r="350" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 10" className="animate-[spin_90s_linear_infinite_reverse]" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-y-24 relative z-30">
            {ecosystem.map((category, idx) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredCategory(category.category)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`rounded-3xl p-8 transition-all duration-500 relative group ${
                  hoveredCategory === category.category ? 'scale-105 z-40' : 'scale-100'
                } ${
                  hoveredCategory !== null && hoveredCategory !== category.category ? 'opacity-40' : 'opacity-100'
                } ${idx === 3 ? 'lg:col-start-1 lg:translate-x-12' : ''} ${idx === 4 ? 'lg:col-start-3 lg:-translate-x-12' : ''}`}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: `1px solid ${hoveredCategory === category.category ? category.accentColor + '50' : 'var(--border)'}`,
                  boxShadow: hoveredCategory === category.category ? `var(--shadow-card-hover), 0 0 30px ${category.accentColor}15` : 'var(--shadow-card)',
                }}
              >
                {/* Top accent gradient bar */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${category.color} rounded-t-3xl opacity-50 group-hover:opacity-100 transition-opacity`} />

                <h3 className="text-xl font-display font-bold mb-6 tracking-tight flex items-center justify-between" style={{ color: 'var(--text-heading)' }}>
                  {category.category}
                  <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color} animate-pulse`} />
                </h3>

                <div className="flex flex-wrap gap-3">
                  {category.tech.map(tech => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full text-sm font-sans transition-smooth"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-secondary)',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = category.accentColor + '50'
                        ;(e.currentTarget as HTMLElement).style.color = category.accentColor
                        ;(e.currentTarget as HTMLElement).style.backgroundColor = category.accentColor + '10'
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                        ;(e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                        ;(e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-secondary)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
