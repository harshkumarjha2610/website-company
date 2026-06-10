'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { caseStudies, CaseStudy } from '@/data/caseStudies'
import { ArrowRight, ChevronRight, Activity, TrendingUp, Users, DollarSign } from 'lucide-react'

// Animated Counter
const AnimatedCounter = ({ value, prefix = '', suffix = '' }: { value: string; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const target = parseFloat(value)

  useEffect(() => {
    let startTime: number
    const duration = 2000

    const animate = (time: number) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 4)
      setCount(target * ease)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [target])

  const displayValue = target % 1 === 0 ? Math.round(count) : count.toFixed(1)
  return <span className="font-display font-bold tabular-nums">{prefix}{displayValue}{suffix}</span>
}

// 3D Tilt Card
const TiltCard = ({ study, index }: { study: CaseStudy; index: number }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useTransform(x, [-0.5, 0.5], [10, -10])
  const mouseYSpring = useTransform(y, [-0.5, 0.5], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{
        rotateX: mouseYSpring,
        rotateY: mouseXSpring,
        transformStyle: 'preserve-3d',
      }}
      className="group relative rounded-3xl p-8 lg:p-10 transition-colors duration-300"
      data-theme-card
    >
      <div
        className="rounded-3xl p-8 lg:p-10 transition-smooth"
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
        <div style={{ transform: 'translateZ(50px)' }}>
          <div className="flex items-center justify-between mb-6">
            <span
              className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full font-sans"
              style={{ backgroundColor: 'rgba(34,211,238,0.1)', color: '#22d3ee' }}
            >
              {study.industry}
            </span>
            <ArrowRight className="w-5 h-5 group-hover:text-[#22d3ee] group-hover:-rotate-45 transition-smooth" style={{ color: 'var(--text-muted)' }} />
          </div>

          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-tight" style={{ color: 'var(--text-heading)' }}>
            {study.projectName}
          </h3>

          <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8" style={{ borderBottom: '1px solid var(--border)' }}>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-2 font-sans" style={{ color: 'var(--text-muted)' }}>The Challenge</h4>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{study.challenge}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-2 font-sans" style={{ color: 'var(--text-muted)' }}>Our Solution</h4>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{study.solution}</p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-sm font-bold uppercase tracking-wider mb-3 font-sans" style={{ color: 'var(--text-muted)' }}>Key Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {study.technologies.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-sans"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 font-sans" style={{ color: 'var(--text-muted)' }}>Measurable Impact</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {Object.entries(study.metrics).map(([key, metric]) => {
                if (!metric) return null
                const getIcon = () => {
                  if (key.includes('revenue') || key.includes('cost')) return <DollarSign className="w-4 h-4 text-[#22d3ee]" />
                  if (key.includes('efficiency')) return <Activity className="w-4 h-4 text-violet-400" />
                  if (key.includes('user')) return <Users className="w-4 h-4 text-emerald-400" />
                  return <TrendingUp className="w-4 h-4 text-cyan-400" />
                }
                return (
                  <div
                    key={key}
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {getIcon()}
                      <span className="text-xs font-sans uppercase" style={{ color: 'var(--text-muted)' }}>{metric.label}</span>
                    </div>
                    <div className="text-2xl md:text-3xl font-display" style={{ color: 'var(--text-heading)' }}>
                      <AnimatedCounter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Hover reveal */}
          <div className="mt-8 overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
            <h4 className="text-sm font-bold mb-3 font-sans" style={{ color: 'var(--text-heading)' }}>Key Outcomes:</h4>
            <ul className="space-y-2">
              {study.keyOutcomes.map((outcome, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-sans" style={{ color: 'var(--text-secondary)' }}>
                  <ChevronRight className="w-4 h-4 text-[#22d3ee] mt-0.5 flex-shrink-0" />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      {/* Decorative glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-violet-600 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" style={{ opacity: 'var(--glow-opacity)' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#22d3ee] to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" style={{ opacity: 'var(--glow-opacity)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 md:flex md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6 tracking-tight" style={{ color: 'var(--text-heading)' }}>
              Featured <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-lg font-sans leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Explore how we have engineered digital transformation for global enterprises, delivering measurable business value through advanced technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-6 md:mt-0"
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 font-sans font-medium hover:text-[#22d3ee] transition-smooth group"
              style={{ color: 'var(--text-primary)' }}
            >
              View All Case Studies
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-smooth" />
            </a>
          </motion.div>
        </div>

        <div className="space-y-8" style={{ perspective: '1000px' }}>
          {caseStudies.map((study, index) => (
            <TiltCard key={study.id} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
