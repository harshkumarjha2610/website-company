'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    title: 'CEO, TechStartup Inc',
    content: 'TechFlow transformed our complex digital vision into a polished reality. The engineering team was highly responsive, professional, and delivered well beyond our initial expectations.',
    rating: 5,
    initials: 'SJ',
    avatarBg: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Michael Chen',
    title: 'CTO, FinanceHub',
    content: 'Their expert guidance in high-throughput scalable database architecture helped our core platform seamlessly handle a 10x surge in user traffic. Highly recommended for enterprise projects.',
    rating: 5,
    initials: 'MC',
    avatarBg: 'from-purple-500 to-pink-600',
  },
  {
    name: 'Emma Rodriguez',
    title: 'Product Manager, HealthCare Solutions',
    content: 'The SaaS software suite they researched and developed is now our primary revenue-driving product. Incredible attention to detail, sleek design aesthetics, and user experience.',
    rating: 5,
    initials: 'ER',
    avatarBg: 'from-cyan-500 to-blue-600',
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const tiltCardRef = useRef<HTMLDivElement>(null)

  // Reset progress and handle autoplay tick
  useEffect(() => {
    setProgress(0)
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext()
          return 0
        }
        return prev + 1.67 // ~100 in 6 seconds (100ms tick × 60 = 6000ms)
      })
    }, 100)

    return () => clearInterval(timer)
  }, [activeIndex])

  const handleNext = () => {
    setDirection('next')
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setDirection('prev')
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    // Max 8 degrees rotation
    setTilt({
      x: (y / (rect.height / 2)) * -8,
      y: (x / (rect.width / 2)) * 8
    })
  }

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 })
  }

  const current = testimonials[activeIndex]

  // Slide animations config
  const slideVariants = {
    initial: (dir: 'next' | 'prev') => ({
      x: dir === 'next' ? 200 : -200,
      opacity: 0,
      scale: 0.95
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: (dir: 'next' | 'prev') => ({
      x: dir === 'next' ? -200 : 200,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3, ease: 'easeIn' }
    })
  }

  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Background Soft Purple Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[130px] rounded-full pointer-events-none -z-10"
        style={{ opacity: 'var(--glow-opacity)' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight text-gray-900 dark:text-white">
            What Our <span className="bg-gradient-to-r from-[#ff5f1f] to-purple-600 bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-base md:text-lg max-w-lg mx-auto font-sans text-gray-500 dark:text-gray-400">
            Trusted by leading technology teams and executives globally
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative min-h-[350px] flex items-center justify-center">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              ref={tiltCardRef}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.1s ease-out',
                boxShadow: 'var(--shadow-card)',
              }}
              className="w-full max-w-2xl rounded-3xl border border-gray-200/80 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-lg p-8 md:p-12 relative flex flex-col justify-between text-left group cursor-grab active:cursor-grabbing"
            >
              {/* Quote Mark Decoration */}
              <div className="absolute top-6 right-8 text-gray-200 dark:text-white/5 pointer-events-none select-none">
                <Quote size={80} className="fill-current" />
              </div>

              <div style={{ transform: 'translateZ(30px)' }}>
                {/* Five Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {Array(current.rating).fill(0).map((_, i) => (
                    <Star key={i} size={16} className="fill-[#ff5f1f] text-[#ff5f1f]" />
                  ))}
                </div>

                {/* Text Content */}
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 font-sans italic leading-relaxed mb-8">
                  &ldquo;{current.content}&rdquo;
                </p>
              </div>

              {/* Author Details Block */}
              <div
                style={{ transform: 'translateZ(20px)' }}
                className="flex items-center justify-between border-t border-gray-200 dark:border-white/10 pt-6 mt-auto"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${current.avatarBg} flex items-center justify-center text-white font-display font-bold text-sm shadow-md`}>
                    {current.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">{current.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{current.title}</p>
                  </div>
                </div>

                {/* Stars Indicator */}
                <div className="text-xs font-bold text-gray-400 dark:text-gray-500 font-mono">
                  {activeIndex + 1} / {testimonials.length}
                </div>
              </div>

              {/* Slide Progress Indicator Bar */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#ff5f1f] to-purple-600 rounded-b-3xl transition-all duration-100" style={{ width: `${progress}%` }} />
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 bg-white/50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-[#ff5f1f] dark:hover:text-[#ff5f1f] transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          
          {/* Dot Pagination */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > activeIndex ? 'next' : 'prev')
                  setActiveIndex(i)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-6 bg-[#ff5f1f]' : 'bg-gray-300 dark:bg-gray-700'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 bg-white/50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-[#ff5f1f] dark:hover:text-[#ff5f1f] transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  )
}

