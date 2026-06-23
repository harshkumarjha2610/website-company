'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Calendar } from 'lucide-react'
import FloatingCube from './3d/FloatingCube'
import { useTheme } from '@/components/ThemeProvider'

const words = [
  'AI Solutions',
  'Enterprise Platforms',
  'Digital Transformation',
  'Cloud Engineering',
  'Product Innovation',
  'Next Gen Experiences'
]

export default function Hero() {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Typing Animation Configuration
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)
  const [blink, setBlink] = useState(true)

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setBlink(p => !p)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  // Typing logic
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000)
      return () => clearTimeout(timeout)
    }

    if (subIndex === 0 && reverse) {
      setReverse(false)
      setIndex(prev => (prev + 1) % words.length)
      return
    }

    const timeout = setTimeout(() => {
      setSubIndex(prev => prev + (reverse ? -1 : 1))
    }, reverse ? 75 : 150)

    return () => clearTimeout(timeout)
  }, [subIndex, reverse, index])

  // Canvas morphing mesh background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Vibrant Orange/Coral/Red-Orange mesh gradients adapted for themes
    const blobColors = theme === 'dark'
      ? [
          'rgba(255, 95, 31, 0.15)',  // #ff5f1f
          'rgba(255, 127, 80, 0.15)', // #ff7f50
          'rgba(255, 69, 0, 0.15)',  // #ff4500
        ]
      : [
          'rgba(255, 95, 31, 0.08)',
          'rgba(255, 127, 80, 0.08)',
          'rgba(255, 69, 0, 0.06)',
        ]

    const blobs = [
      { x: Math.random() * width, y: Math.random() * height, vx: 0.3, vy: 0.3, r: 350, color: blobColors[0] },
      { x: Math.random() * width, y: Math.random() * height, vx: -0.4, vy: 0.2, r: 450, color: blobColors[1] },
      { x: Math.random() * width, y: Math.random() * height, vx: 0.2, vy: -0.3, r: 400, color: blobColors[2] }
    ]

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      
      // Draw background base color
      ctx.fillStyle = theme === 'dark' ? '#08080A' : '#F8F9FA'
      ctx.fillRect(0, 0, width, height)

      // Draw fluid blobs
      blobs.forEach(blob => {
        blob.x += blob.vx
        blob.y += blob.vy

        // Bounce bounds
        if (blob.x < -blob.r || blob.x > width + blob.r) blob.vx *= -1
        if (blob.y < -blob.r || blob.y > height + blob.r) blob.vy *= -1

        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r)
        grad.addColorStop(0, blob.color)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [theme])

  const triggerCalendly = () => {
    const event = new CustomEvent('toggle-calendly-modal', { detail: { open: true } })
    window.dispatchEvent(event)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden z-0">
      
      {/* Canvas Fluid Mesh Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-20 block" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Content Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:col-span-7 flex flex-col justify-center text-left"
        >
          {/* Sparkles Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-[#ff5f1f] w-fit mb-6"
            style={{
              backgroundColor: 'var(--badge-bg)',
              border: '1px solid var(--badge-border)',
            }}
          >
            <Sparkles size={16} className="animate-spin-slow" />
            <span>AI-Driven Software Systems</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold leading-[1.1] mb-6 tracking-tight text-gray-900 dark:text-white">
            Engineering Digital Products That{' '}
            <span className="bg-gradient-to-r from-[#ff5f1f] to-purple-600 bg-clip-text text-transparent">
              Define Industries
            </span>
          </h1>

          {/* Typing Container */}
          <div className="h-10 md:h-12 flex items-center mb-6 font-display font-bold text-xl md:text-2xl text-gray-700 dark:text-gray-300">
            <span className="mr-2 text-gray-400">Transforming via</span>
            <span className="text-[#ff5f1f] font-mono">
              {words[index].substring(0, subIndex)}
              <span className={`inline-block w-1.5 h-6 bg-[#ff5f1f] ml-1 ${blink ? 'opacity-100' : 'opacity-0'}`} />
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-base md:text-lg mb-8 leading-relaxed font-sans max-w-xl text-gray-600 dark:text-gray-400">
            We build scalable AI-powered platforms, enterprise software, and digital ecosystems for the world&apos;s fastest growing companies.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={triggerCalendly}
              className="bg-gradient-to-r from-[#ff5f1f] to-purple-600 hover:from-[#ff7f50] hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold transition-smooth flex items-center justify-center gap-2 group hover:-translate-y-1 shadow-glow"
            >
              <Calendar size={18} />
              <span>Schedule Consultation</span>
              <ArrowRight className="group-hover:translate-x-1.5 transition-smooth" size={18} />
            </button>
            
            <a
              href="#projects"
              className="px-8 py-4 rounded-xl font-bold border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-smooth hover:-translate-y-1 text-center"
            >
              View Case Studies
            </a>
          </div>

          {/* Trust stats */}
          <div
            className="grid grid-cols-3 gap-6 p-6 rounded-2xl max-w-xl"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {[
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '500+', label: 'Global Clients', middle: true },
              { value: '24/7', label: 'Premium Support' },
            ].map(({ value, label, middle }) => (
              <div
                key={label}
                className={`text-center md:text-left ${middle ? 'border-x px-4' : ''}`}
                style={middle ? { borderColor: 'var(--border)' } : {}}
              >
                <p className="text-2xl md:text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white">{value}</p>
                <p className="text-[11px] md:text-xs font-semibold mt-1 text-gray-500 dark:text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Floating Cube Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="hidden md:block md:col-span-5 h-[500px] relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ff5f1f]/10 to-purple-600/10 rounded-full blur-[60px] -z-10" />
          <FloatingCube />
        </motion.div>

      </div>
    </section>
  )
}

