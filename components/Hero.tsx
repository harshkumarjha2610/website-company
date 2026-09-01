'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Calendar, ShieldCheck, Users, Headset } from 'lucide-react'
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
    <section className="relative h-screen flex flex-col items-center justify-center pt-24 overflow-hidden z-0">
      
      {/* Canvas Fluid Mesh Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-20 block" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] -z-10" />

      {/* Floating Globe Visual — absolutely centered behind hero text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-auto"
      >
        {/* Glow halo */}
        <div className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-gradient-to-tr from-[#26FF00]/15 to-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        {/* Globe container — sized so it fills the center, clipped to circle */}
        <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[900px] lg:h-[900px] relative">
          <FloatingCube />
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10 w-full mt-[-5vh]">
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center w-full"
        >
          {/* Sparkles Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-[#ff5f1f] w-fit mb-4 lg:mb-6"
            style={{
              backgroundColor: 'var(--badge-bg)',
              border: '1px solid var(--badge-border)',
            }}
          >
            <Sparkles size={16} className="animate-spin-slow" />
            <span>AI-Powered Digital Transformation</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.1] mb-4 lg:mb-6 tracking-tight text-gray-900 dark:text-white max-w-4xl">
            Engineering Digital Products That <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#ff5f1f] to-purple-600 bg-clip-text text-transparent">
              Define Industries
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-lg lg:text-xl mb-6 lg:mb-8 leading-relaxed font-sans max-w-2xl text-gray-600 dark:text-gray-400">
            We build scalable AI-powered platforms, enterprise software, and digital ecosystems for the world&apos;s fastest growing companies.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 lg:mb-10 justify-center w-full">
            <button
              onClick={triggerCalendly}
              className="bg-gradient-to-r from-[#ff5f1f] to-purple-600 hover:from-[#ff7f50] hover:to-purple-700 text-white px-8 py-3 lg:py-4 rounded-xl font-bold transition-smooth flex items-center justify-center gap-2 group hover:-translate-y-1 shadow-glow"
            >
              <Calendar size={18} />
              <span>Schedule Consultation</span>
              <ArrowRight className="group-hover:translate-x-1.5 transition-smooth" size={18} />
            </button>
            
            <a
              href="#projects"
              className="px-8 py-3 lg:py-4 rounded-xl font-bold border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-smooth hover:-translate-y-1 text-center"
            >
              View Case Studies
            </a>
          </div>

          {/* Trust stats */}
          <div
            className="flex flex-row justify-center items-center gap-4 sm:gap-8 md:gap-12 p-4 lg:p-6 w-full max-w-3xl"
          >
            {[
              { value: '99.9%', label: 'Uptime SLA', icon: <ShieldCheck size={24} className="text-[#26FF00] mb-1 lg:mb-2" /> },
              { value: '500+', label: 'Global Clients', icon: <Users size={24} className="text-[#26FF00] mb-1 lg:mb-2" />, middle: true },
              { value: '24/7', label: 'Premium Support', icon: <Headset size={24} className="text-[#26FF00] mb-1 lg:mb-2" /> },
            ].map(({ value, label, icon, middle }) => (
              <div
                key={label}
                className={`flex flex-col items-center text-center ${middle ? 'border-x border-gray-200 dark:border-white/10 px-4 sm:px-8 md:px-12' : ''}`}
              >
                {icon}
                <p className="text-xl md:text-3xl font-display font-bold tracking-tight text-gray-900 dark:text-white">{value}</p>
                <p className="text-[10px] md:text-sm font-semibold mt-1 text-gray-500 dark:text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

