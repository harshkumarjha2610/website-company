'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Users, HeartHandshake, Globe2 } from 'lucide-react'

interface StatItem {
  icon: React.ReactNode
  target: number
  suffix: string
  label: string
  description: string
  color: string
}

function Counter({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }
    requestAnimationFrame(step)
  }, [isInView, target, duration])

  return <span ref={ref}>{count}</span>
}

export default function Stats() {
  const statsList: StatItem[] = [
    {
      icon: <Trophy className="text-[#ff5f1f]" size={24} />,
      target: 500,
      suffix: '+',
      label: 'Projects Delivered',
      description: 'Enterprise & AI systems launched successfully.',
      color: 'rgba(255, 95, 31, 0.15)'
    },
    {
      icon: <Users className="text-purple-500" size={24} />,
      target: 300,
      suffix: '+',
      label: 'Enterprise Clients',
      description: 'High-growth technology and global partners.',
      color: 'rgba(168, 85, 247, 0.15)'
    },
    {
      icon: <HeartHandshake className="text-emerald-500" size={24} />,
      target: 95,
      suffix: '%',
      label: 'Client Retention',
      description: 'Long-term commitments to sustainable engineering.',
      color: 'rgba(16, 185, 129, 0.15)'
    },
    {
      icon: <Globe2 className="text-blue-500" size={24} />,
      target: 15,
      suffix: '+',
      label: 'Countries Served',
      description: 'Deployments spanning multiple regions globally.',
      color: 'rgba(59, 130, 246, 0.15)'
    }
  ]

  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Background soft gradients */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-[#ff5f1f]/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsList.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative p-8 rounded-3xl border border-gray-200/80 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] group"
              style={{
                boxShadow: 'var(--shadow-card)',
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement
                target.style.borderColor = 'var(--text-heading)'
                target.style.boxShadow = `0 10px 30px rgba(0,0,0,0.1), 0 0 20px ${stat.color}`
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement
                target.style.borderColor = 'var(--border)'
                target.style.boxShadow = 'var(--shadow-card)'
              }}
            >
              {/* Card top bar accent */}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-100 dark:bg-white/5 mb-6 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>

              {/* Number and suffix */}
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl md:text-5xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight">
                  <Counter target={stat.target} />
                </span>
                <span className="text-2xl md:text-3xl font-display font-bold text-[#ff5f1f]">
                  {stat.suffix}
                </span>
              </div>

              {/* Label & Description */}
              <h4 className="text-base font-display font-bold text-gray-800 dark:text-gray-200 mb-2">
                {stat.label}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
